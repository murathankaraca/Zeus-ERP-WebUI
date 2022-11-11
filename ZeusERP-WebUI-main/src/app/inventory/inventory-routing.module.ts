import { ContactsComponent } from './contacts/contacts.component';
import { LocationsComponent } from './locations/locations.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { InventoryMenuComponent } from './inventory-menu/inventory-menu.component';
import { InventoryComponent } from './inventory.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './products/product/product.component';
import { ProductsComponent } from './products/products.component';
import { ReplenishmentsComponent } from './orders/replenishments/replenishments.component';
import { ScrapsComponent } from './orders/scraps/scraps.component';
import { DeliveriesComponent } from './orders/deliveries/deliveries.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { WarehouseAddComponent } from './warehouses/warehouse-add/warehouse-add.component';
import { LocationAddComponent } from './locations/location-add/location-add.component';
import { LocationComponent } from './locations/location/location.component';
import { WarehouseComponent } from './warehouses/warehouse/warehouse.component';
import { AddressComponent } from './addresses/address/address.component';
import { AddressAddComponent } from './addresses/address-add/address-add.component';
import { ScrapComponent } from './orders/scraps/scrap/scrap.component';
import { ScrapAddComponent } from './orders/scraps/scrap-add/scrap-add.component';
import { ReplenishmentsAddComponent } from './orders/replenishments/replenishments-add/replenishments-add.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { CategoryAddComponent } from './categories/category-add/category-add.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { ContactAddComponent } from './contacts/contact-add/contact-add.component';
import { InventoryGuard } from './inventory.guard';

const inventoryRoutes: Routes = [
  { path: '', component: InventoryComponent,
    children: [
      {
        path: 'products',
        children: [
          { path: 'add', component: ProductAddComponent },
          { path: 'edit/:id', component: ProductAddComponent },
          { path: ':id', component: ProductComponent },
          { path: '', component: ProductsComponent, pathMatch: 'full' },
        ]
      },
      {
        path: 'categories',
        children: [
          { path: 'edit/:id', component: CategoryAddComponent },
          { path: 'add', component: CategoryAddComponent },
          { path: ':id', component: CategoryComponent, pathMatch: 'full' },
          { path: '', component: CategoriesComponent, pathMatch: 'full' },
        ]
      },
      {
        path: 'orders',
        children: [
          { path: '', component: OrdersComponent, pathMatch: 'full' },
          { 
            path: 'replenishments',
            children: [
              { path: '', component: ReplenishmentsComponent, pathMatch: 'full' },
              { path: 'add', component: ReplenishmentsAddComponent },
            ] 
          },
          { 
            path: 'scraps', 
            children: [
              { path: 'add', component: ScrapAddComponent },
              { path: 'edit/:id', component: ScrapAddComponent },
              { path: ':id', component: ScrapComponent },
              { path: '', component: ScrapsComponent, pathMatch: 'full' },
            ] 
          },
          { 
            path: 'deliveries', 
            children: [
              { path: '', component: DeliveriesComponent, pathMatch: 'full' },
            ] 
          },
        ],
      },
      {
        path: 'addresses',
        children: [
          { path: 'add', component: AddressAddComponent },
          { path: 'edit/:id', component: AddressAddComponent },
          { path: ':id', component: AddressComponent },
        ],
      },
      {
        path: 'locations',
        children: [
          { path: '', component: LocationsComponent, pathMatch: 'full' },

          { path: 'add', component: LocationAddComponent },
          { path: 'edit/:id', component: LocationAddComponent },
          { path: ':id', component: LocationComponent },
        ],
      },
      {
        path: 'warehouses',
        children: [
          { path: '', component: WarehousesComponent, pathMatch: 'full'},
          { path: 'add', component: WarehouseAddComponent },
          { path: ':id', component: WarehouseComponent },
          { path: 'edit/:id', component: WarehouseAddComponent },
        ],
      },
      {
        path: 'contacts',
        children: [
          { path: '', component: ContactsComponent, pathMatch: 'full' },
          { path: 'add', component: ContactAddComponent },
          { path: 'edit/:id', component: ContactAddComponent },
          { path: ':id', component: ContactComponent },
        ],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(inventoryRoutes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
