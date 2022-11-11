import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.scss']
})
export class AddressAddComponent implements OnInit, OnDestroy {

  routeSub: Subscription;

  addressId: number;
  addressSub: Subscription;
  addressAddSub: Subscription;
  addressUpdateSub: Subscription;


  @Input()
  inDialogMode: boolean = false;

  @Output()
  AddAddress: EventEmitter<Address> = new EventEmitter<Address>();

  @Output()
  DiscardDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  addressForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressService,
    private formBuilder: FormBuilder
  ) { 
    this.addressForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
    });

    this.routeSub = this.route.params.subscribe(p => {
      if(p["id"] !== undefined) {
        const id: number = +p["id"];
        this.addressId = id;
        console.log('Category ID is: ', id);

        this.addressSub = this.addressService
        .getAddressById(id).subscribe(a => {
          // TODO: Patch values to the form.
          this.addressForm.patchValue({
            title: a.title,
            description: a.description,
          });
        });
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.addressSub) {
      this.addressSub.unsubscribe();
    }
    if(this.addressAddSub) {
      this.addressAddSub.unsubscribe();
    }
    if(this.addressUpdateSub) {
      this.addressUpdateSub.unsubscribe();
    }
  }

  onSubmit(): void {
    const addressToAdd: Address = {
      title: this.addressForm.get("title").value,
      description: this.addressForm.get("description").value,
    };
    console.log(`Address to add will be: ${addressToAdd.title}`);

    if(this.addressId) {
      addressToAdd.id = this.addressId;
      this.addressUpdateSub = this.addressService.update(addressToAdd)
    .subscribe(data => this.router.navigate(['/', 'inventory','products']));
    } else {
      this.addressAddSub = this.addressService.add(addressToAdd)
    .subscribe(data => this.router.navigate(['/', 'inventory','products']));
    }

  }

  onDiscard(): void {
    this.router.navigate(['/', 'inventory','address']);
  }

}
