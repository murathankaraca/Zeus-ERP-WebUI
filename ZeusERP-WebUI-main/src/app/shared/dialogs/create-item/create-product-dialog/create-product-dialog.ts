import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'create-product-dialog',
  templateUrl: './create-product-dialog.html',
  styleUrls: ['./create-product-dialog.scss']
})
export class CreateProductDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onCreate(product: Product) {
    console.log(product.name + "IS THE PRODUCT");
    this.dialogRef.close(product);
  }

  onDiscard(shouldHide: boolean) {
    if(shouldHide) {
      this.dialogRef.close();
    }
  }

}
