import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ManufacturingComponent } from 'src/app/manufacturing/manufacturing.component';
import { ManufacturingComponentDetailsDto } from 'src/app/models/complex-types/manufacturing-component-details.dto';
import { ManufacturingDetailsDto } from 'src/app/models/complex-types/manufacturing-details.dto';
import { ManufacturingOrderComponent } from 'src/app/models/manufacturing-component.model';
import { OrderManufacturing } from 'src/app/models/order-manufacturing.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { LocationService } from 'src/app/services/location.service';
import { ManufacturingComponentService } from 'src/app/services/order-manufacturing.component.service';
import { ManufacturingOrderService } from 'src/app/services/order-manufacturing.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { CreateBomcompDialog } from 'src/app/shared/dialogs/create-item/create-bomcomp-dialog/create-bomcomp.dialog';
import { CreateManucompDialogComponent } from 'src/app/shared/dialogs/create-item/create-manucomp-dialog/create-manucomp-dialog.component';
import { decimalPattern } from 'src/app/utils/regexp.pattern';

@Component({
  selector: 'app-manufacturing-orders-add',
  templateUrl: './manufacturing-order-add.component.html',
  styleUrls: ['./manufacturing-order-add.component.scss']
})
export class ManufacturingOrderAddComponent implements OnInit {


  manuOrderId: number;
  manuOrderForm: FormGroup;

  displayedComponentColumns: string[] = [
    "productName",
    "quantity"
  ];

  compDataSource: MatTableDataSource<ManufacturingComponentDetailsDto> = new MatTableDataSource();

  manuOrder: ManufacturingOrderComponent;
  manuSub: Subscription;

  manuOrderDetails: ManufacturingDetailsDto;
  manuOrderDetailsSub: Subscription;

  manuOrderAddSub: Subscription;
  manuOrderUpdateSub: Subscription;

  manuComps: ManufacturingOrderComponent;
  manuCompsSub: Subscription;

  manuCompAddSub: Subscription;

  products: Array<Product>;
  productsSub: Subscription;

  responsibles: Array<User>;
  responsibleSub: Subscription;

  componentLocationSub: Subscription;
  finishedLocationSub: Subscription;


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
    private locationService: LocationService,
    private userService: UserService,
    private manuOrderService: ManufacturingOrderService,
    private manuOrderCompService: ManufacturingComponentService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.manuOrderForm = this.formBuilder.group({
      reference: [],
      productToManufactureId: [],
      bomId: [],
      quantityToManufacture: [[Validators.pattern(decimalPattern)]],
      quantityManufactured: [[Validators.pattern(decimalPattern)]],
      scheduledDate: [],
      responsibleId: [],
      componentsId: [],
      componentsLocationId: [],
      finishedProductsLocationId: [],
    });
   }

   openDialog(): void {
    const dialogRef = this.dialog.open(CreateManucompDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.manuOrderId = +param['id'];

      // Load all products.
      this.productsSub = this.productService.getAllProducts().subscribe(p => {
        this.products = p;
        console.log(p);
      });

      // Load all users.
      this.responsibleSub = this.userService.getAllUsers().subscribe(r => {
        this.responsibles = r;
        console.log(r);
      });


      // If an id parameter was given during routing.
      if (this.manuOrderId) {

        console.log('There is a parameter for the Bill of Materials. Id is: ' + this.manuOrderId);

        this.manuOrderDetailsSub = this.manuOrderService.getOrderDetailsDto(this.manuOrderId)
        .pipe(
          tap(
            (b => {
              this.manuOrderDetails = b;
              this.manuOrderForm.patchValue({
                reference: b.reference,
                productToManufactureId: b.productToManufactureId,
                bomId: b.bomId,
                quantityToManufacture: b.quantityToManufacture,
                quantityManufactured: b.quantityManufactured,
                scheduledDate: b.scheduledDate,
                responsibleId: b.responsibleId,
                componentsId: b.componentsId,
                componentsLocationId: b.componentsLocationId,
                finishedProductsLocationId: b.finishedProductsLocationId
              });
              this.manuCompsSub = this.manuOrderCompService.getManuCompDetailsDtoByOrderId(this.manuOrderId).subscribe(comps => {
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
    this.productsSub.unsubscribe();
    this.responsibleSub.unsubscribe();
    this.componentLocationSub.unsubscribe();
    this.finishedLocationSub.unsubscribe();
    if (this.manuOrderDetailsSub) {
      this.manuOrderDetailsSub.unsubscribe();
    }
    if (this.manuOrderAddSub) {
      this.manuOrderDetailsSub.unsubscribe();
    }
    if (this.manuOrderUpdateSub) {
      this.manuOrderDetailsSub.unsubscribe();
    }
  }

  onSubmit() {
    console.log(this.manuOrderForm);

    // If an edit operation is occurring:
    if (this.manuOrderId) {
      const orderToAdd: OrderManufacturing = {
        id: this.manuOrderId,
        reference: this.manuOrderForm.get('reference').value,
        productToManufactureId: +this.manuOrderForm.get('productToManufactureId').value,
        bomId: +this.manuOrderForm.get('bomId').value,
        quantityToManufacture: +this.manuOrderForm.get('quantityToManufacture').value,
        quantityManufactured: +this.manuOrderForm.get('quantityManufactured').value,
        scheduledDate: this.manuOrderForm.get('productToManufactureId').value,
        responsibleId: this.manuOrderForm.get('productToManufactureId').value,
        componentsId: +this.manuOrderForm.get('productToManufactureId').value,
        componentsLocationId: +this.manuOrderForm.get('productToManufactureId').value,
        finishedProductsLocationId: +this.manuOrderForm.get('productToManufactureId').value,
      };

      this.manuOrderUpdateSub = this.manuOrderService.update(orderToAdd)
      .pipe(
        tap(
          (data => console.log(data)),
          (err => console.error(err))
        )
      ).subscribe();
    } else {
      const orderToAdd: OrderManufacturing = {
        reference: this.manuOrderForm.get('reference').value,
        productToManufactureId: +this.manuOrderForm.get('productToManufactureId').value,
        bomId: +this.manuOrderForm.get('bomId').value,
        quantityToManufacture: +this.manuOrderForm.get('quantityToManufacture').value,
        quantityManufactured: +this.manuOrderForm.get('quantityManufactured').value,
        scheduledDate: this.manuOrderForm.get('productToManufactureId').value,
        responsibleId: this.manuOrderForm.get('productToManufactureId').value,
        componentsId: +this.manuOrderForm.get('productToManufactureId').value,
        componentsLocationId: +this.manuOrderForm.get('productToManufactureId').value,
        finishedProductsLocationId: +this.manuOrderForm.get('productToManufactureId').value,
      };
      this.manuOrderAddSub = this.manuOrderService.add(orderToAdd)
      .pipe(
        tap(
          (data => console.log(data)),
          (err => console.error(err))
        )
      ).subscribe();
    }
  }

  onDiscard() {
    console.table(this.manuOrderForm);
  }

  navigateToProduct(id: number) {
    this.router.navigate(['/', 'inventory', 'products', String(id)]);
  }

  navigateBack() {
    this.router.navigate(['/', 'manufacturing', 'boms']);
  }

  openCreateComponentDialog() {
    // let dialogRef = this.dialog.open(CreateBomcompDialog, {
    //   height: '400px',
    //   width: '600px',
    //   data: {
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result:`);
    //   console.log(result);
    //   this.manuCompAddSub = this.manuOrderCompService.add(result)
    //   .pipe(
    //     tap(
    //       (data => console.log(data)),
    //       (err => console.error(err))
    //     )
    //   ).subscribe();
    // });
  }

}
