import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {

  paramsSubscription : Subscription;

  address: Address;
  addressSub: Subscription;
  addressDeleteSub: Subscription;
  
  @Input()
  showDetails: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressService,
  ) {
    this.paramsSubscription = this.route.params.subscribe(params => {
      const id = +params["id"];
      this.addressSub = this.addressService.getAddressById(id).subscribe(a => {
        this.address = a;
        console.log(this.address);
      });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.paramsSubscription)  {
      this.paramsSubscription.unsubscribe();
    }
    if(this.addressSub) {
      this.addressSub.unsubscribe();
    }
  }

  deleteAddress(): void  {
    this.addressDeleteSub  =  this.addressService
    .delete(this.address.id)
    .subscribe(data => this.router.navigate(['/','inventory']));
  }

}
