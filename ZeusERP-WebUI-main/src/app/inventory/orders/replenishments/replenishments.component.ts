import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplenishmentDetailsDto } from 'src/app/models/complex-types/replenishment-details.dto';
import { Product } from 'src/app/models/product.model';
import { Location } from 'src/app/models/location.model';
import { OrderReplenishmentService } from 'src/app/services/order-replenishment.service';
import { LocationService } from 'src/app/services/location.service';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-replenishments',
  templateUrl: './replenishments.component.html',
  styleUrls: ['./replenishments.component.scss']
})
export class ReplenishmentsComponent implements OnInit, AfterViewInit, OnDestroy {

  replenishmentListDto: Array<ReplenishmentDetailsDto>;
  replenishmentListSub: Subscription;

  products: Array<Product> = new Array<Product>();
  productsSub: Subscription;

  locations: Array<Location> = new Array<Location>();
  locationsSub: Subscription;

  displayedColumns: string[] = ['productName', 'locationName', 'onHandQuantity', 'orderedQuantity'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
      private productService: ProductService,
      private locationService: LocationService,
      private replenishmentDetailsService: OrderReplenishmentService,
      private router: Router
    ) {
        this.replenishmentListSub = this.replenishmentDetailsService.getReplenishmentDetails().subscribe(r => {
          this.replenishmentListDto = r;
        });
        this.productsSub = this.productService.getAllProducts().subscribe(p => {
          this.products = p;
        });
        this.locationsSub = this.locationService.getAllLocations().subscribe(l => {
          this.locations = l;
        });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.replenishmentListDto);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.locationsSub.unsubscribe();
    this.replenishmentListSub.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigate(url) {
    this.router.navigate(url);
  }
}

