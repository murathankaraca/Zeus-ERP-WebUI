import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { tap } from 'rxjs/operators';
import { BillOfMaterials } from 'src/app/models/bom.model';
import { BomComponentDetailsDto } from 'src/app/models/complex-types/bom-component.dto';
import { BomDetailsDto } from 'src/app/models/complex-types/bom-details.dto';
import { ProductDetailsDto } from 'src/app/models/complex-types/product-details.dto';
import { BomType } from 'src/app/models/enums/bom-type.enum';
import { Product } from 'src/app/models/product.model';
import { BomComponentService } from 'src/app/services/bom.component.service';
import { BomsService } from 'src/app/services/bom.service';
import { ProductService } from 'src/app/services/product.service';
import { CreateBomcompDialog } from 'src/app/shared/dialogs/create-item/create-bomcomp-dialog/create-bomcomp.dialog';
import { decimalPattern } from 'src/app/utils/regexp.pattern';

@Component({
  selector: 'app-bom-add',
  templateUrl: './bom-add.component.html',
  styleUrls: ['./bom-add.component.scss']
})
export class BomAddComponent implements OnInit {

  bomId: number;
  bomForm: FormGroup;

  displayedComponentColumns: string[] = [
    "productName",
    "quantity"
  ];

  compDataSource: MatTableDataSource<BomComponentDetailsDto> = new MatTableDataSource();
  
  bom: BillOfMaterials;
  bomSub: Subscription;

  bomDetails: BomDetailsDto;
  bomDetailsSub: Subscription;

  bomCompDetails: BomComponentDetailsDto;
  bomCompDetailsSub: Subscription;

  bomCompAddSub: Subscription;

  products: Array<Product>;
  productsSub: Subscription;


  @ViewChild('btnSubmit')
  btnSubmit: ElementRef;

  @Input()
  inDialogMode: boolean = false;

  @Output()
  AddBom: EventEmitter<Product> = new EventEmitter<Product>();

  @Output()
  DialogDiscard: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private bomService: BomsService,
    private bomCompService: BomComponentService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.bomForm = this.formBuilder.group({
      reference: ['', [Validators.required, Validators.minLength(3)]],
      productId: [],
      bomType: [BomType.KIT],
      quantity: [0.000, [Validators.pattern(decimalPattern)]],
    });
   }

   openDialog(): void {
    const dialogRef = this.dialog.open(CreateBomcompDialog, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.bomId = +param['id'];

      // Load all products.
      this.productsSub = this.productService.getAllProducts().subscribe(p => {
        this.products = p;
        console.log(p);
      });


      // If an id parameter was given during routing.
      if (this.bomId) {

        console.log('There is a parameter for the Bill of Materials. Id is: ' + this.bomId);

        this.bomDetailsSub = this.bomService.getBomDetailsDto(this.bomId)
        .pipe(
          tap(
            (b => {
              this.bomDetails = b;
          
              this.bomForm.patchValue({
                reference: b.bomReference,
                productId: b.productId,
                bomType: b.bomType,
                quantity: b.quantity
              });
    
              this.bomCompDetailsSub = this.bomCompService.getAllBomComponentsByOrderId(this.bomId).subscribe(comps => {
                console.table(comps);
                this.compDataSource.data = comps;
              });
            }),
            (err => {
              console.error(err);
            }),
          )
        )
        .subscribe();

      }
    })
  }
  ngAfterViewInit() {

  }
  ngOnDestroy() {
    if(this.productsSub) {
      this.productsSub.unsubscribe();
    }
    if(this.bomDetailsSub) {
      this.bomDetailsSub.unsubscribe();
    }
  }

  onSubmit() {
    console.log(this.bomForm);
    const bomToAdd: BillOfMaterials = {
      reference: this.bomForm.get('reference').value,
      bomType: this.bomForm.get('bomType').value,
      productId: this.bomForm.get('productId').value,
      quantity: Number(this.bomForm.get('quantity').value),
    }
    // If an edit operation is occurring:
    if(this.bomId) {
      bomToAdd.id = this.bomId;
      this.bomSub = this.bomService.update(bomToAdd)
      .pipe(
        tap(
          (data => console.log(data)),
          (err => console.error(err))
        )
      ).subscribe();
    } else {
      this.bomSub = this.bomService.add(bomToAdd)
      .pipe(
        tap(
          (data => console.log(data)),
          (err => console.error(err))
        )
      ).subscribe();
    }
  }

  onDiscard() {
    console.table(this.bomForm);
  }

  navigateToProduct(id: number) {
    this.router.navigate(['/', 'inventory', 'products', String(id)]);
  }

  navigateBack() {
    this.router.navigate(['/', 'manufacturing', 'boms']);
  }

  openCreateComponentDialog() {
    let dialogRef = this.dialog.open(CreateBomcompDialog, {
      height: '400px',
      width: '600px',
      data: {
        products: this.products,
        bomId: this.bomId 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`);
      console.log(result);
      this.bomCompAddSub = this.bomCompService.add(result)
      .pipe(
        tap(
          (data => console.log(data)),
          (err => console.error(err))
        )
      ).subscribe();
    });
    
  }
}
