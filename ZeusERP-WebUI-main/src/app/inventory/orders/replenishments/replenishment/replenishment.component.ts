import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplenishmentDetailsDto } from 'src/app/models/complex-types/replenishment-details.dto';
import { Product } from 'src/app/models/product.model';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';
import { ProductService } from 'src/app/services/product.service';
import { CreateProductDialog } from 'src/app/shared/dialogs/create-item/create-product-dialog/create-product-dialog';
import { CreateLocationDialog } from 'src/app/shared/dialogs/create-item/create-location-dialog/create-location-dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderReplenishmentService } from 'src/app/services/order-replenishment.service';

@Component({
  selector: 'app-replenishment',
  templateUrl: './replenishment.component.html',
  styleUrls: ['./replenishment.component.scss']
})
export class ReplenishmentComponent implements OnInit, OnDestroy {

  replenishmentDetailsDto: Array<ReplenishmentDetailsDto>;
  replenishmentDetailsSub: Subscription;

  products: Array<Product>;
  productsSub: Subscription;

  locations: Array<Location> = new Array<Location>();
  locationsSub: Subscription;

  productOnHand: number = 0.000;

  replenishmentForm: FormGroup;

  displayedColumns: string[] = ['productName', 'locationName', 'onHandQuantity', 'orderedQuantity', 'x'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  routeSubscription: Subscription;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
      private productService: ProductService,
      private locationService: LocationService,
      private replenishmentService: OrderReplenishmentService,
      private formBuilder: FormBuilder,
      private dialog: MatDialog,
      private route: ActivatedRoute,
    ) {

      this.routeSubscription = this.route.params.subscribe(p => {
        const id = +p['id'];
        if(id) {
          this.productsSub = this.productService.getAllProducts().subscribe(products => {
            this.products = products;
          });
          this.locationsSub = this.locationService.getAllLocations().subscribe(l => {
            this.locations = l;
          });
          this.replenishmentDetailsSub = this.replenishmentService.getReplenishmentDetailsById(id).subscribe(r => {
            this.replenishmentDetailsDto.push(r);
          });
          this.formBuilder.group({
            replenishedQuantity:  [0.000, ],
          });
        }
      });

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.replenishmentDetailsDto);
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.locationsSub.unsubscribe();
    this.replenishmentDetailsSub.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  openProductDialog(): void {
    const dialogRef = this.dialog.open(CreateProductDialog, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('RESULT IS: ', result.name);
      this.products.push(result);
    });
  }

  openLocationDialog(): void {
    const dialogRef = this.dialog.open(CreateLocationDialog, {
      width: '500px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  changeOnHandQuantity(product: Product) {
    console.log('On change product is below.');
    console.log(product);
    if(product !== undefined) {
      this.productOnHand = Number(product.unitCount);
      return;
    }
    this.productOnHand = 0.000;
  }



}

