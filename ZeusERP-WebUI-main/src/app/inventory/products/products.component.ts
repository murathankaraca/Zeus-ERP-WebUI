import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableInput, Subscription } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ProductListDto } from 'src/app/models/complex-types/product-list.dto';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  failedLoading: boolean = undefined;
  productListDtos: Array<ProductListDto> = [];
  productListSub: Subscription;
  products: Array<Product>;

  name: string;

  constructor(
    private productService: ProductService,
    private router: Router
    ) { 
      
    }

  ngOnInit() {
    this.productListSub = this.productService.getProductListDto().subscribe(
      response => {
        this.productListDtos = response;
      },
      error => {
        this.onRetrievalError(error)
      }
    );
  }

  ngOnDestroy() {
    if(this.productListSub) {
      this.productListSub.unsubscribe();
    }
  }

  onRetrievalError(error: HttpErrorResponse) {
    console.error("An error was encountered during the 'ProductListDto' request.");
    console.error(error);
    this.failedLoading = true;
  }
  
  addProduct() {
    this.router.navigate(["/", "inventory", "products" , "add"]);
  }

  editProduct(productId: number) {
    this.router.navigate(["/", "inventory", "products" , "edit", productId]);
  }

  showProductDetails(productId: number) {
    this.router.navigate(["/", "inventory", "products", productId]);
  }

  showCategoryDetails(categoryId: number) {
    this.router.navigate(['/', 'inventory', 'categories', categoryId]);
  }

}
