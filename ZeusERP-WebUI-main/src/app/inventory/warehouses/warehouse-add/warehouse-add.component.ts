import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WarehouseDetailsDto } from 'src/app/models/complex-types/warehouse-details.dto';
import { Warehouse } from 'src/app/models/warehouse.model';
import { LocationService } from 'src/app/services/location.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Location } from 'src/app/models/location.model';
import { decimalPattern } from 'src/app/utils/regexp.pattern';

@Component({
  selector: 'app-warehouse-add',
  templateUrl: './warehouse-add.component.html',
  styleUrls: ['./warehouse-add.component.scss']
})
export class WarehouseAddComponent implements OnInit, AfterViewInit, OnDestroy {



  @ViewChild("btnsubmit", { static: false, read: ElementRef }) 
  btnSubmit: ElementRef;

  warehouseForm = new FormGroup({
    warehouseCode: new FormControl('', Validators.required),
    warehouseName: new FormControl('', Validators.required),
    hasLimitedStockCount: new FormControl(false)
  });

  warehouseId: number;

  warehouseDetailsSub: Subscription;
  paramsSub: Subscription;

  displayedColumns: string[] = ['warehouseCode', 'warehouseName', 'locationName', 'hasLimitedStockCount', 'stockLimit', 'usedForManufacture', 'details'];
  
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    [{'warehouseCode': '', 'warehouseName': '', 'locationId': Number(undefined), 'hasLimitedStockCount': false, 'stockLimit': Number(undefined), 'usedForManufacture': false, 'details': ''}]
  );

  locations: Array<Location> = new Array<Location>();
  locationSub: Subscription;
  warehouseSub: Subscription;
  warehouseAddSub: Subscription;
  warehouseUpdateSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private warehouseService: WarehouseService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
  ) {
    this.warehouseForm = this.formBuilder.group({
      warehouseCode: ['', Validators.required],
      warehouseName: ['', Validators.required],
      locationId: [],
      hasLimitedStockCount: [false],
      stockLimit: [Number(0.000), Validators.pattern(decimalPattern)],
      usedForManufacture: [false],
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      
      this.route.params.subscribe(params => {
        this.warehouseId = +params["id"];
        if(this.warehouseId) {
          this.warehouseSub = this.warehouseService.getWarehouseDetailsDto(this.warehouseId).subscribe(w => {
            console.log(w);
            this.warehouseForm.get('warehouseCode').setValue(w.warehouseCode);
            this.warehouseForm.get('warehouseName').setValue(w.warehouseName);
            this.warehouseForm.get('hasLimitedStockCount').setValue(w.hasLimitedStockCount);
            this.warehouseForm.get('stockLimit').setValue(w.stockLimit);
            this.warehouseForm.get('usedForManufacture').setValue(w.usedForManufacture);
            this.warehouseForm.get('locationId').setValue(w.locationId);
          });

        }
      });
    }, 0);
  }

  ngAfterViewInit() {
    this.locationSub = this.locationService.getAllLocations().pipe(
      tap(
        data => {
          console.log(data);
          this.locations = data;
        },
        err => console.error(err)
      )
    ).subscribe();
  }

  ngOnDestroy() {
    this.warehouseAddSub.unsubscribe();
  }

  onSubmitForm(): void {
    console.warn(this.warehouseForm.value);
    if(this.warehouseForm.valid) {

      const warehouseToAdd: Warehouse = {
        name: this.warehouseForm.get('warehouseName').value,
        warehouseCode: this.warehouseForm.get('warehouseCode').value,
        hasLimitedStockCount: this.warehouseForm.get('hasLimitedStockCount').value,
        locationId: this.warehouseForm.get('locationId').value,
        stockLimit: Number(this.warehouseForm.get('stockLimit').value),
        usedForManufacture: this.warehouseForm.get('usedForManufacture').value
      };

      if(this.warehouseId) {
        // Update the warehouse data.
        warehouseToAdd.id = this.warehouseId;
        this.warehouseUpdateSub = this.warehouseService.update(warehouseToAdd)
        .pipe(
          tap(
            data => {
              console.log(data);
            },
            err => console.error(err)
          )
        ).subscribe();
      } else {
         // Add new warehouse.
         this.warehouseAddSub = this.warehouseService.add(warehouseToAdd)
         .pipe(
           tap(
             data => {
               console.log(data);
             },
             err => console.error(err)
           )
         ).subscribe();
      }
      console.table(warehouseToAdd);
      // this.warehouseService.add(warehouseToAdd);
      // this.router.navigate(['/', 'inventory', 'warehouses']);
    }
  }

}
