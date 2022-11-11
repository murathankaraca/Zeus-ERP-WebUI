import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Address } from 'src/app/models/address.model';
import { Location } from 'src/app/models/location.model';
import { AddressService } from 'src/app/services/address.service';
import { LocationService } from 'src/app/services/location.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.scss']
})
export class LocationAddComponent implements OnInit, OnDestroy {

  @ViewChild('btnSubmit', { static: false, read: ElementRef })
  btnSubmit: ElementRef;

  showDetails: boolean = true;

  addresses: Array<Address>;
  addressesSub: Subscription;

  locationId: number;
  location: Location;
  locationSub: Subscription;

  paramsSub: Subscription;

  locationForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private locationService: LocationService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.locationForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      addressId: new FormControl(),
      isInternalLocation: new FormControl(false),
      isScrapLocation: new FormControl(false),
      isReturnLocation: new FormControl(false),
    });
    this.addressesSub = this.addressService.getAllAddresses()
    .pipe(
      tap(
        data => this.addresses = data,
        err => console.log(err)
      )
    ).subscribe();
    setTimeout(() => {
      this.paramsSub = this.route.params.subscribe(params => {
        this.locationId = params["id"];
        console.log('[location-add] param is: ' + this.locationId);
        if(this.locationId) {
          this.locationId = Number(this.locationId);
          this.locationSub = this.locationService.getLocationById(this.locationId).subscribe(l => {
            this.locationForm.get('name').setValue(l.name);
            this.locationForm.get('code').setValue(l.code);
            this.locationForm.get('addressId').setValue(l.addressId);
            this.locationForm.get('isInternalLocation').setValue(l.isInternalLocation);
            this.locationForm.get('isScrapLocation').setValue(l.isScrapLocation);
            this.locationForm.get('isReturnLocation').setValue(l.isReturnLocation);
            // TODO: Fetch image from server to the product image.
            //
            this.btnSubmit.nativeElement.innerText = 'Save';
          });
        }
      });
    }, 0);
  }

  ngOnDestroy() {
    if(this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
    if(this.locationSub) {
      this.locationSub.unsubscribe();
    }
  }

  onSubmit() {
    if(this.locationForm.valid) {
      const locToAdd: Location = {
        name: this.locationForm.get('name').value,
        code: this.locationForm.get('code').value,
        addressId: this.locationForm.get('addressId').value,
        isInternalLocation: this.locationForm.get('isInternalLocation').value,
        isScrapLocation: this.locationForm.get('isScrapLocation').value,
        isReturnLocation: this.locationForm.get('isReturnLocation').value,
        locationTypeId: 1,
      }
      console.log(locToAdd);
      console.log(this.locationId);
      if (this.locationId) {
        locToAdd.id = this.locationId;
        this.locationService.update(locToAdd).subscribe(d => {
          this.router.navigate(['/', 'inventory', 'locations']);
        });
      }
      else {
        this.locationService.add(locToAdd).subscribe(d => {
          console.log(d);
          this.router.navigate(['/', 'inventory', 'locations']);
        });
      }
      
    }
  }

  onDiscard() {

  }

}
