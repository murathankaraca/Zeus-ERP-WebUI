import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WarehouseDetailsDto } from 'src/app/models/complex-types/warehouse-details.dto';
import { LocationService } from 'src/app/services/location.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  warehouseId: number;
  locationSub: Subscription;
  warehouseDetailsSub: Subscription;
  paramsSub: Subscription;

  displayedColumns: string[] = ['warehouseId', 'warehouseCode', 'warehouseName', 'locationName'];
  dataSource: MatTableDataSource<WarehouseDetailsDto> = new MatTableDataSource<WarehouseDetailsDto>();


  constructor(
    private locationService: LocationService,
    private warehouseService: WarehouseService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.warehouseId = +params["id"];
      
      if(!this.warehouseId) {
        this.router.navigate(['/', 'inventory']);
      }

      this.warehouseDetailsSub = this.warehouseService.getWarehouseDetailsDto(this.warehouseId).pipe(
        tap(
          data => {
            this.dataSource = new MatTableDataSource([]);
            this.dataSource.data.push(data);
            console.log(data);
          },
          err => console.log(err)
        )
      ).subscribe();
    });
  }

}
