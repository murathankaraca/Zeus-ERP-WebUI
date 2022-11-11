import { Component, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from 'events';
import { Subscription } from 'rxjs';
import { BomComponent } from 'src/app/manufacturing/bom/bom.component';
import { BillOfMaterialComponent } from 'src/app/models/bom-component.model';
import { Product } from 'src/app/models/product.model';
import { BomComponentService } from 'src/app/services/bom.component.service';
import { ProductService } from 'src/app/services/product.service';
import { decimalPattern } from 'src/app/utils/regexp.pattern';

@Component({
  selector: 'app-create-bomcomp-dialog',
  templateUrl: './create-bomcomp.dialog.html',
  styleUrls: ['./create-bomcomp.dialog.scss']
})
export class CreateBomcompDialog implements OnInit, OnDestroy {

  bomCompForm: FormGroup;

  bomCompSub: Subscription;

  bomId: number;
  products: Array<Product>;

  constructor(
    public dialogRef: MatDialogRef<CreateBomcompDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bomCompService: BomComponentService,
    private fb: FormBuilder) {
    this.bomCompForm = this.fb.group({
      productId: ['', [Validators.required]],
      quantity: [0.000, [Validators.required, Validators.pattern(decimalPattern)]],
    });
    this.products = data["products"];
    this.bomId = data["bomId"];
  }

  ngOnInit(): void {


  }

  ngOnDestroy(): void {
    if(this.bomCompSub) {
      this.bomCompSub.unsubscribe();
    }
  }

  onSubmit(): BillOfMaterialComponent {
    if(this.bomCompForm.valid) {
      const bomComponentToAdd: BillOfMaterialComponent = {
        bomId: this.bomId,
        productId: this.bomCompForm.get("productId").value,
        quantity: Number(this.bomCompForm.get("quantity").value)
      }
      return bomComponentToAdd;
    }
    return null;
  }

  onDiscard(): void {
    this.dialogRef.close();
  }

}
