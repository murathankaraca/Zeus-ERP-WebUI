import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplenishmentDetailsDto } from 'src/app/models/complex-types/replenishment-details.dto';
import { Product } from 'src/app/models/product.model';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';
import { ProductService } from 'src/app/services/product.service';
import { CreateProductDialog } from 'src/app/shared/dialogs/create-item/create-product-dialog/create-product-dialog';
import { CreateLocationDialog } from 'src/app/shared/dialogs/create-item/create-location-dialog/create-location-dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderReplenishment } from 'src/app/models/order-replenishment.model';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderReplenishmentService } from 'src/app/services/order-replenishment.service';
import { decimalPattern } from 'src/app/utils/regexp.pattern';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-replenishments-add',
  templateUrl: './replenishments-add.component.html',
  styleUrls: ['./replenishments-add.component.scss']
})
export class ReplenishmentsAddComponent implements OnInit, OnDestroy {

  orderId: number;

  replenishmentDetailsDto: Array<ReplenishmentDetailsDto>;
  replenishmentDetailsSub: Subscription;

  replenishmentAddSub: Subscription;
  replenishmentUpdateSub: Subscription;

  products: Array<Product> = new Array<Product>();
  productsSub: Subscription;

  locations: Array<Location> = new Array<Location>();
  locationsSub: Subscription;

  replenishmentForm: FormGroup;

  routeSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private locationService: LocationService,
    private replenishmentService: OrderReplenishmentService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    ) {
      this.replenishmentForm = this.fb.group({
        reference: ['', [Validators.required, Validators.minLength(3)]],
        productToReplenishId: [],
        locationId: [],
        onHandQuantity: [0.000, [Validators.pattern(decimalPattern)]],
        orderQuantity: [0.000, [Validators.pattern(decimalPattern)]],
      });

      this.productsSub = this.productService.getAllProducts().pipe(
        tap(
          (data => this.products = data),
          (err => this.handleProductError(err))
        )
      ).subscribe();
      this.locationsSub = this.locationService.getAllLocations().pipe(
        tap(
          (data => this.locations = data),
          (err => this.handleLocationError(err))
        )
      ).subscribe();
  }
  handleLocationError(err: any): void {
    throw new Error('Method not implemented.');
  }
  handleProductError(err: any): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.locationsSub.unsubscribe();
    if(this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.replenishmentAddSub) {
      this.replenishmentAddSub.unsubscribe();
    }
    if (this.replenishmentUpdateSub) {
      this.replenishmentUpdateSub.unsubscribe();
    }
    if (this.replenishmentDetailsSub) {
      this.replenishmentDetailsSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(p => {
      const id = +p;
      if (id) {
        this.replenishmentDetailsSub = this.replenishmentService.getReplenishmentDetailsById(id).subscribe(r => {
          this.replenishmentForm.patchValue({
            reference: r.reference,
            productId: r.productToReplenishId,
            locationId: r.locationId,
            onHandQuantity: r.onHandQuantity,
            orderQuantity: r.orderQuantity,
          });
        });
      }
    });
  }

  openProductDialog(): void {
    let dialogRef = this.dialog.open(CreateProductDialog, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('RESULT IS: ', result);
      this.products.push(result);
    });
  }

  openLocationDialog(): void {
    let dialogRef = this.dialog.open(CreateLocationDialog, {
      width: '500px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onSubmit() {
    if (this.orderId) {
      const updatedReplenishment: OrderReplenishment = {
        id: this.orderId,
        reference: this.replenishmentForm.get("reference").value,
        productToReplenishId: this.replenishmentForm.get("productToReplenishId").value,
        locationId: this.replenishmentForm.get("locationId").value,
        onHandQuantity: Number(this.replenishmentForm.get("onHandQuantity").value),
        orderQuantity: Number(this.replenishmentForm.get("orderQuantity").value),
        replenishmentStatusId: 0
      };
      this.replenishmentUpdateSub = this.replenishmentService.update(updatedReplenishment).pipe(
        tap(
          (data => console.log(data)),
          (err => this.handleReplenishmentDetailsError(err)),
        )
      ).subscribe();
    } else {
      const replenishmentOrderToAdd: OrderReplenishment = {
        reference: this.replenishmentForm.get("reference").value,
        productToReplenishId: this.replenishmentForm.get("productToReplenishId").value,
        locationId: this.replenishmentForm.get("locationId").value,
        onHandQuantity: Number(this.replenishmentForm.get("onHandQuantity").value),
        orderQuantity: Number(this.replenishmentForm.get("orderQuantity").value),
        replenishmentStatusId: 0
      };
      this.replenishmentAddSub = this.replenishmentService.add(replenishmentOrderToAdd).pipe(
        tap(
          (data => console.log(data)),
          (err => this.handleReplenishmentDetailsError(err)),
        )
      ).subscribe();
    }
  }

  onDiscard() {

  }

  handleReplenishmentDetailsError(err) {

  }



}

