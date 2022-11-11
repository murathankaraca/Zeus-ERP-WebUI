import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WarehouseListDto } from 'src/app/models/complex-types/warehouse-list.dto';
import { Warehouse } from 'src/app/models/warehouse.model';
import { LocationService } from 'src/app/services/location.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

import { Location } from './../../models/location.model';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit, AfterViewInit {


  warehouseListDto: Array<WarehouseListDto>;
  warehouseListDtoSub: Subscription;


  displayedColumns: string[] = ['warehouseId', 'warehouseCode', 'warehouseName', 'locationReference', 'details'];
  dataSource: MatTableDataSource<WarehouseListDto> = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private warehouseService: WarehouseService, 
    private router: Router,
    private route: ActivatedRoute) {
      
  }

  ngOnInit(): void {
    this.warehouseListDtoSub = this.warehouseService.getWarehouseListDto()
    .pipe(
      tap(
        data => {
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        err => console.error(err)
      )
    ).subscribe();
  }

  ngAfterViewInit(): void {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToLocation(id: number) {
    this.router.navigate(['/', 'inventory', 'locations', id.toString()]);
  }

  navigateToWarehouse(id: number) {
    this.router.navigate(['/', 'inventory', 'warehouses', id.toString()]);
  }

  navigateToEditWarehouse(id: number) {
    this.router.navigate(['/', 'inventory', 'warehouses', 'edit', id.toString()]);
  }

  navigate(url) {
    this.router.navigate(url);
  }

}
