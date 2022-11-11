import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationListDto } from 'src/app/models/complex-types/location-list.dto';
import { LocationService } from 'src/app/services/location.service';

import { Location } from './../../models/location.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, AfterViewInit, OnDestroy {


  displayedColumns: string[] = ['locationId', 'locationName', 'locationCode', 'details'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  locationsDto: Array<LocationListDto>;
  locationsSub: Subscription;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.locationsSub = this.locationService.getLocationListDto().subscribe(l => {
      this.dataSource = new MatTableDataSource<LocationListDto>(l);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.paginator);
  }

  ngOnDestroy(): void {
    if(this.locationsSub)  {
      this.locationsSub.unsubscribe();
    }
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


  navigateToEditLocation(id: number) {
    this.router.navigate(['/', 'inventory', 'locations', 'edit', id.toString()]);
  }

  navigate(url) {
    this.router.navigate(url);
  }

}
