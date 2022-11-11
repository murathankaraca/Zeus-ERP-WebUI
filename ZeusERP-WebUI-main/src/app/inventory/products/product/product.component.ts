import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ProductDetailsDto } from 'src/app/models/complex-types/product-details.dto';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-details',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  hasFailed: boolean = false;

  paramsSubscription: Subscription;

  productDetails: ProductDetailsDto;
  productDetailsSub: Subscription;

  profileImageUrl: string;

  @Input()
  showDetails = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      const id = +params["id"];
      this.productDetailsSub = this.productService.getProductDetailsDto(id)
      .pipe(
        tap(
          data => { this.productDetails = data; console.log(data) },
          error => this.catchProductDetailsError(error)
        )
      )
      .subscribe();
    });
  }

  ngOnDestroy(): void {
    if(this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if(this.productDetailsSub) {
      this.productDetailsSub.unsubscribe();
    }

  }

  navigate(uris) {
    console.log("Navigation: ", uris);
    this.router.navigate(uris);
  }

  deleteProduct() {
    this.productService.delete(this.productDetails.productId).pipe(
      tap(
        data => { console.log(data); },
        err => { console.error(err); }
      )
    ).subscribe();
    
  }

  catchProductDetailsError(err: string) {
    console.warn("An error was encountered during product details fetch operation:");
    console.error(err);
  }

}
