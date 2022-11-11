import { Product } from './../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateProductDialog } from './../../shared/dialogs/create-item/create-product-dialog/create-product-dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-master-page',
  templateUrl: './inventory-menu.component.html',
  styleUrls: ['./inventory-menu.component.scss']
})
export class InventoryMenuComponent implements OnInit {

  products: Array<Product>;
  productsSub: Subscription;

  name: string;
  animal: string;



  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    //this.productsSub = this.productService.getAllProducts()
  }

  openNewProductDialog(product: Product): void {
    let dialogRef = this.dialog.open(CreateProductDialog, {
      data: product,
      panelClass: 'product-add-dialog'
    })

    dialogRef.afterClosed().subscribe( result => {
      console.log("Dialog was closed.");
      this.animal = result;
    })
  }

  editProduct(productId: number) {
    this.router.navigate(["/", "inventory", "products", "edit", productId]);
  }

  showProductDetails(productId: number) {
    this.router.navigate(["/", "inventory", "products", productId]);
  }

  navigate(url) {
    this.router.navigate(url);
  }

}
