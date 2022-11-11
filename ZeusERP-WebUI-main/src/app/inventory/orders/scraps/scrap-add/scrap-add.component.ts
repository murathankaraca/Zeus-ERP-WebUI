import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ScrapDetailsDto } from 'src/app/models/complex-types/scrap-details.dto';
import { Product } from 'src/app/models/product.model';
import { Location } from 'src/app/models/location.model';
import { Scrap } from 'src/app/models/scrap.model';
import { LocationService } from 'src/app/services/location.service';
import { ProductService } from 'src/app/services/product.service';
import { ScrapOrdersService } from 'src/app/services/scrap.service';
import { decimalPattern } from 'src/app/utils/regexp.pattern';

@Component({
  selector: 'app-scrap-add',
  templateUrl: './scrap-add.component.html',
  styleUrls: ['./scrap-add.component.scss']
})
export class ScrapAddComponent implements OnInit, OnDestroy {

  orderId: number;

  routeParamsSub: Subscription;

  scrapAddSub: Subscription;
  scrapDetailsDto: Scrap;
  scrapDetailsSub: Subscription;

  products: Array<Product>;
  productSub: Subscription;
  locations: Array<Location>;
  locationsSub: Subscription;

  @ViewChild('btnSubmit')
  btnSubmit: ElementRef;

  @Input()
  inDialogMode: boolean = false;

  @Output()
  AddScrap: EventEmitter<Scrap> = new EventEmitter<Scrap>();

  @Output()
  DialogDiscard: EventEmitter<boolean> = new EventEmitter<boolean>();

  scrapForm: FormGroup;

  constructor(
    private productService: ProductService,
    private locationService: LocationService,
    private scrapService: ScrapOrdersService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.scrapForm = this.fb.group({
      reference: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      productId: [],
      quantity: [0.000, [Validators.pattern(decimalPattern)]],
      scheduledDate: [new Date(), [Validators.required]],
      sourceLocationId: [],
      scrapLocationId: [],
    });
  }

  ngOnInit(): void {
    this.productSub = this.productService.getAllProducts().pipe(
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
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.orderId = +params["id"];
      if(this.orderId) {
        // Edit will occur.
        this.scrapDetailsSub = this.scrapService.getScrapById(this.orderId).pipe(
          tap(
            (scrapDetails => {
              this.scrapDetailsDto = scrapDetails;
              this.scrapForm.patchValue({
                id: scrapDetails.id,
                reference: scrapDetails.reference,
                description: scrapDetails.description,
                productId: scrapDetails.productId,
                quantity: scrapDetails.quantity,
                scheduledDate: scrapDetails.scheduledDate,
                sourceLocationId: scrapDetails.sourceLocationId,
                scrapLocationId: scrapDetails.scrapLocationId
              });
            }),
            (err => this.handleScrapDetailsError(err))
          )
        ).subscribe();
      } else {
        // Create New will occur.
      }
    });
  }

  ngOnDestroy(): void {
    if(this.scrapDetailsSub) {
      this.scrapDetailsSub.unsubscribe();
    }
    if(this.productSub) {
      this.productSub.unsubscribe();
    }
    if(this.locationsSub) {
      this.locationsSub.unsubscribe();
    }
  }

  handleScrapDetailsError(err) {
    console.error(err);
  }

  handleProductError(err) {
    console.error(err);
  }

  handleLocationError(err) {
    console.error(err);
  }

  onSubmit() {
    if (this.orderId) {
      const updatedScrap: Scrap = {
        id: this.orderId,
        reference: this.scrapForm.get("reference").value,
        description: this.scrapForm.get("description").value,
        productId: this.scrapForm.get("productId").value,
        quantity: this.scrapForm.get("quantity").value,
        scheduledDate: this.scrapForm.get("scheduledDate").value,
        sourceLocationId: this.scrapForm.get("sourceLocationId").value,
        scrapLocationId: this.scrapForm.get("scrapLocationId").value,
      }
      this.scrapAddSub = this.scrapService.update(updatedScrap).pipe(
        tap(
          (data => console.log(data)),
          (err => this.handleScrapDetailsError(err)),
        )
      ).subscribe();
    } else {
      const scrapToAdd: Scrap = {
        reference: this.scrapForm.get("reference").value,
        description: this.scrapForm.get("description").value,
        productId: this.scrapForm.get("productId").value,
        quantity: this.scrapForm.get("quantity").value,
        scheduledDate: this.scrapForm.get("scheduledDate").value,
        sourceLocationId: this.scrapForm.get("sourceLocationId").value,
        scrapLocationId: this.scrapForm.get("scrapLocationId").value,
      }
      this.scrapAddSub = this.scrapService.add(scrapToAdd).pipe(
        tap(
          (data => console.log(data)),
          (err => this.handleScrapDetailsError(err)),
        )
      ).subscribe();
    }
  }

  onDiscard() {

  }

}
