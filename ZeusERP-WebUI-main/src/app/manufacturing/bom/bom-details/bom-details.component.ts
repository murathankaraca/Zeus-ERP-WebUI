import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BillOfMaterials } from 'src/app/models/bom.model';
import { BomComponentDetailsDto } from 'src/app/models/complex-types/bom-component.dto';
import { BomDetailsDto } from 'src/app/models/complex-types/bom-details.dto';
import { BomComponentService } from 'src/app/services/bom.component.service';
import { BomsService } from 'src/app/services/bom.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-bom-details',
  templateUrl: './bom-details.component.html',
  styleUrls: ['./bom-details.component.scss']
})
export class BomDetailsComponent implements OnInit {

  
  bomId: number;

  displayedComponentColumns: string[] = [
    "productName",
    "quantity"
  ];

  compDataSource: MatTableDataSource<BomComponentDetailsDto> = new MatTableDataSource();
  
  bom: BillOfMaterials;
  bomSub: Subscription;

  bomDetails: BomDetailsDto;
  bomDetailsSub: Subscription;

  bomCompDetails: Array<BomComponentDetailsDto>;
  bomCompDetailsSub: Subscription;

  bomCompAddSub: Subscription;

  productsSub: Subscription;


  @ViewChild('btnSubmit')
  btnSubmit: ElementRef;

  @Input()
  inDialogMode: boolean = false;

  @Output()
  DialogDiscard: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private bomService: BomsService,
    private bomCompService: BomComponentService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.bomId = +param['id'];


      // If an id parameter was given during routing.
      if (this.bomId) {

        console.log('There is a parameter for the Bill of Materials. Id is: ' + this.bomId);

        this.bomDetailsSub = this.bomService.getBomDetailsDto(this.bomId)
        .pipe(
          tap(
            (b => {
              console.log(b);
              this.bomDetails = b;
    
              this.bomCompDetailsSub = this.bomCompService.getAllBomComponentsByOrderId(this.bomId).subscribe(comps => {
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

  navigateToProduct(id: number) {
    this.router.navigate(['/', 'inventory', 'products', id.toString()]);
  }

}
