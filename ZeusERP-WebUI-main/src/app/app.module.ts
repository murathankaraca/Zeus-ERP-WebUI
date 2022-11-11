import { ProductService } from './services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { InventoryRoutingModule } from './inventory/inventory-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MasterComponent } from './master/master.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryMenuComponent } from './inventory/inventory-menu/inventory-menu.component';
import { ProductComponent } from './inventory/products/product/product.component';
import { CategoryComponent } from './inventory/categories/category/category.component';
import { ProductAddComponent } from './inventory/products/product-add/product-add.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { OrdersComponent } from './inventory/orders/orders.component';
import { OrderAddComponent } from './inventory/orders/order-add/order-add.component';
import { LocationsComponent } from './inventory/locations/locations.component';
import { ContactsComponent } from './inventory/contacts/contacts.component';
import { ProductsComponent } from './inventory/products/products.component';
import { ReplenishmentsComponent } from './inventory/orders/replenishments/replenishments.component';
import { DeliveriesComponent } from './inventory/orders/deliveries/deliveries.component';
import { ScrapsComponent } from './inventory/orders/scraps/scraps.component';
import { WarehousesComponent } from './inventory/warehouses/warehouses.component';
import { WarehouseAddComponent } from './inventory/warehouses/warehouse-add/warehouse-add.component';
import { LocationAddComponent } from './inventory/locations/location-add/location-add.component';
import { LocationComponent } from './inventory/locations/location/location.component';
import { WarehouseComponent } from './inventory/warehouses/warehouse/warehouse.component';
import { AddressComponent } from './inventory/addresses/address/address.component';
import { AddressAddComponent } from './inventory/addresses/address-add/address-add.component';
import { ContactComponent } from './inventory/contacts/contact/contact.component';
import { ContactAddComponent } from './inventory/contacts/contact-add/contact-add.component';
import { CategoriesComponent } from './inventory/categories/categories.component';
import { WarehouseService } from './services/warehouse.service';
import { ScrapComponent } from './inventory/orders/scraps/scrap/scrap.component';
import { ScrapAddComponent } from './inventory/orders/scraps/scrap-add/scrap-add.component';
import { DetailCardComponent } from './shared/cards/detail-card/detail-card.component';
import { DetailActionComponent } from './shared/cards/detail-card/detail-action/detail-action.component';
import { DetailCardHeaderComponent } from './shared/cards/detail-card/detail-card-header/detail-card-header.component';
import { TextDetailsComponent } from './shared/text-details/text-details.component';
import { EditTextDetailsComponent } from './shared/edit-text-details/edit-text-details.component';

// tslint:disable-next-line: max-line-length
import { DetailSecondaryHeaderComponent } from './shared/cards/detail-card/detail-card-header/detail-secondary-header/detail-secondary-header.component';
import { ListCardComponent } from './shared/cards/list-card/list-card.component';
import { FormElementContainerComponent } from './shared/form-element-container/form-element-container.component';
import { ProcessCardComponent } from './shared/cards/process-card/process-card.component';
import { ScrapOrdersService } from './services/scrap.service';
import { ManufacturingComponent } from './manufacturing/manufacturing.component';
import { ItemSelectComponent } from './shared/item-select/item-select.component';
import { ReplenishmentsAddComponent } from './inventory/orders/replenishments/replenishments-add/replenishments-add.component';
import { CreateProductDialog } from './shared/dialogs/create-item/create-product-dialog/create-product-dialog';
import { CreateLocationDialog } from './shared/dialogs/create-item/create-location-dialog/create-location-dialog';
import { AddCardComponent } from './shared/cards/add-card/add-card.component';
import { CategoryAddComponent } from './inventory/categories/category-add/category-add.component';
import { ReplenishmentComponent } from './inventory/orders/replenishments/replenishment/replenishment.component';
import { CreateCategoryDialog } from './shared/dialogs/create-item/create-category-dialog/create-category-dialog';
import { HttpClientModule } from '@angular/common/http';
import { BomComponent } from './manufacturing/bom/bom.component';
import { BomComponentsComponent } from './manufacturing/bom-components/bom-components.component';
import { ManufacturingOrdersComponent } from './manufacturing/orders/manufacturing-orders/manufacturing-orders.component';
import { UnbuildOrdersComponent } from './manufacturing/orders/unbuild-orders/unbuild-orders.component';
import { PlmComponent } from './plm/plm.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AccountComponent } from './master/account/account.component';
import { BomAddComponent } from './manufacturing/bom/bom-add/bom-add.component';
import { BomDetailsComponent } from './manufacturing/bom/bom-details/bom-details.component';
import { BomComponentsAddComponent } from './manufacturing/bom-components/bom-components-add/bom-components-add.component';
import { BomComponentsDetailsComponent } from './manufacturing/bom-components/bom-components-details/bom-components-details.component';
import { ManufacturingOrderAddComponent } from './manufacturing/orders/manufacturing-orders/manufacturing-order-add/manufacturing-order-add.component';
import { ManufacturingOrderDetailsComponent } from './manufacturing/orders/manufacturing-orders/manufacturing-order-details/manufacturing-orders-details.component';
import { UnbuildOrderDetailsComponent } from './manufacturing/orders/unbuild-orders/unbuild-order-details/unbuild-order-details.component';
import { UnbuildOrderAddComponent } from './manufacturing/orders/unbuild-orders/unbuild-order-add/unbuild-order-add.component';
import { CreateBomcompDialog } from './shared/dialogs/create-item/create-bomcomp-dialog/create-bomcomp.dialog';
import { LoginComponent } from './master/user/login/login.component';
import { RegisterComponent } from './master/user/register/register.component';
import { AddUserComponent } from './master/user/add-user/add-user.component';
import { ForgotPasswordComponent } from './master/user/forgot-password/forgot-password.component';
import { EcoTagsComponent } from './plm/eco-tags/eco-tags.component';
import { EcoTypesComponent } from './plm/eco-types/eco-types.component';
import { EcoAddComponent } from './plm/eco/eco-add/eco-add.component';
import { EcoDetailsComponent } from './plm/eco/eco-details/eco-details.component';
import { EcoTagAddComponent } from './plm/eco-tags/eco-tag-add/eco-tag-add.component';
import { EcoTypeAddComponent } from './plm/eco-types/eco-type-add/eco-type-add.component';
import { EcoComponent } from './plm/eco/eco.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MAT_COLOR_FORMATS, NgxMatColorPickerComponent, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { CreateManucompDialogComponent } from './shared/dialogs/create-item/create-manucomp-dialog/create-manucomp-dialog.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    InventoryMenuComponent,
    MasterComponent,
    ProductComponent,
    CategoryComponent,
    CategoryAddComponent,
    ProductAddComponent,
    ErrorPageComponent,
    OrdersComponent,
    OrderAddComponent,
    LocationsComponent,
    ContactsComponent,
    ProductsComponent,
    ReplenishmentsComponent,
    DeliveriesComponent,
    ScrapsComponent,
    WarehousesComponent,
    WarehouseAddComponent,
    LocationAddComponent,
    LocationComponent,
    WarehouseComponent,
    AddressComponent,
    AddressAddComponent,
    ContactComponent,
    ContactAddComponent,
    CategoriesComponent,
    ScrapComponent,
    ScrapAddComponent,
    DetailCardComponent,
    DetailActionComponent,
    DetailCardHeaderComponent,
    TextDetailsComponent,
    EditTextDetailsComponent,
    DetailSecondaryHeaderComponent,
    ListCardComponent,
    FormElementContainerComponent,
    ProcessCardComponent,
    ManufacturingComponent,
    ItemSelectComponent,
    ReplenishmentsAddComponent,
    CreateProductDialog,
    CreateLocationDialog,
    AddCardComponent,
    ReplenishmentComponent,
    CreateCategoryDialog,
    BomComponent,
    BomComponentsComponent,
    ManufacturingOrdersComponent,
    UnbuildOrdersComponent,
    PlmComponent,
    AccountComponent,
    BomAddComponent,
    BomDetailsComponent,
    BomComponentsAddComponent,
    BomComponentsDetailsComponent,
    ManufacturingOrderAddComponent,
    ManufacturingOrderDetailsComponent,
    UnbuildOrderDetailsComponent,
    UnbuildOrderAddComponent,
    CreateBomcompDialog,
    LoginComponent,
    RegisterComponent,
    AddUserComponent,
    ForgotPasswordComponent,
    EcoTagsComponent,
    EcoTypesComponent,
    EcoAddComponent,
    EcoDetailsComponent,
    EcoTagAddComponent,
    EcoTypeAddComponent,
    EcoComponent,
    NavbarComponent,
    CreateManucompDialogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    InventoryRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatRippleModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    NgxSkeletonLoaderModule,
    NgxMatDatetimePickerModule,
    NgxMatColorPickerModule,
    MatMomentDateModule

  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
