import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './master/master.component';
import { ManufacturingGuard } from './manufacturing/manufacturing.guard';
import { InventoryGuard } from './inventory/inventory.guard';
import { PlmGuard } from './plm/plm.guard';
const masterRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import("./master/master-routing.module").then( m => m.MasterRoutingModule ),
  },
  {
    path: 'inventory',
    canActivate: [InventoryGuard],
    loadChildren: () => import("./inventory/inventory-routing.module").then( m => m.InventoryRoutingModule ),
  },
  {
    path: 'manufacturing',
    canActivate: [ManufacturingGuard],
    loadChildren: () => import("./manufacturing/manufacturing-routing.module").then( m => m.ManufacturingRoutingModule ),
  },
  {
    path: 'plm',
    canActivate: [PlmGuard],
    loadChildren: () => import("./plm/plm-routing.module").then(m => m.PlmRoutingModule),
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(masterRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
