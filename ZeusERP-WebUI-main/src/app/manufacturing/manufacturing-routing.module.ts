import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturingComponent } from './manufacturing.component';
import { ProductAddComponent } from '../inventory/products/product-add/product-add.component';
import { BomComponent } from './bom/bom.component';
import { BomAddComponent } from './bom/bom-add/bom-add.component';
import { BomDetailsComponent } from './bom/bom-details/bom-details.component';
import { ManufacturingGuard } from './manufacturing.guard';

const manufacturingRoutes: Routes = [
  { path: '', component: ManufacturingComponent, 
    children: [
      { 
        path: 'boms', 
        children: [
          { path: 'edit/:id', component: BomAddComponent },
          { path: 'add', component: BomAddComponent },
          { path: ':id', component: BomDetailsComponent },
          { path: '', component: BomComponent }

        ] 
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(manufacturingRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class ManufacturingRoutingModule { }
