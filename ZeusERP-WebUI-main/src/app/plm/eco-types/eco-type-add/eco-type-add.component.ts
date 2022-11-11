import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EcoTag } from 'src/app/models/eco-tag.model';
import { EcoType } from 'src/app/models/eco-type.model';
import { EcoTypeService } from 'src/app/services/eco-type.service';

@Component({
  selector: 'app-eco-tag-add',
  templateUrl: './eco-type-add.component.html',
  styleUrls: ['./eco-type-add.component.scss']
})
export class EcoTypeAddComponent implements OnInit, OnDestroy {

  @ViewChild('btnsubmit', { read: ElementRef, static: false })
  btnsubmit: ElementRef<any>;

  ecoTypeId: number;
  ecoTypeForm: FormGroup;

  ecoTypeSub: Subscription;
  ecoTypeAddSub: Subscription;
  ecoTypeUpdateSub: Subscription;

  routeParamSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private ecoTypeService: EcoTypeService,
    private router: Router,
    private route: ActivatedRoute) {
    this.ecoTypeForm = this.fb.group({
      name: ['', [Validators.required]],
      emailAlias: []
    });
    this.routeParamSub = this.route.params.subscribe(param => {
      this.ecoTypeId = +param['id'];
    });
  }

  ngOnInit(): void {
    if (this.ecoTypeId) {
      this.ecoTypeSub = this.ecoTypeService.getEcoTypeById(this.ecoTypeId)
      .pipe(
        tap(
          (data => {
            this.ecoTypeForm.patchValue({
              name: data.name,
              emailAlias: data.emailAlias
            });
          }),
          (err => alert('Failed to retrieve relevant data.'))
        )
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.routeParamSub) {
      this.routeParamSub.unsubscribe();
    }
    if(this.ecoTypeSub) {
      this.ecoTypeSub.unsubscribe();
    }
    if (this.ecoTypeAddSub) {
      this.ecoTypeAddSub.unsubscribe();
    }
    if (this.ecoTypeUpdateSub) {
      this.ecoTypeUpdateSub.unsubscribe();
    }
  }

  onSubmit(): any {
    if(this.ecoTypeId) {
      const ecoType: EcoType = {
        id: this.ecoTypeId,
        name: this.ecoTypeForm.get('name').value,
        emailAlias: String(this.ecoTypeForm.get('emailAlias').value)
      };
      this.ecoTypeUpdateSub = this.ecoTypeService.update(ecoType).pipe(
        tap(
          (data => {
            this.router.navigate(['/', 'plm', 'eco-types']);
          }),
          (err => {
            console.error(err);
            alert('There was an error with the update.');
          })
        )
      ).subscribe();
    } else {
      const ecoType: EcoType = {
        name: this.ecoTypeForm.get('name').value,
        emailAlias: String(this.ecoTypeForm.get('emailAlias').value)
      };
      this.ecoTypeAddSub = this.ecoTypeService.add(ecoType).pipe(
        tap(
          (data => {
            console.log(data);
            this.router.navigate(['/', 'plm', 'eco-tags']);
          }),
          (err => alert(err))
        )
      ).subscribe();
    }
  }

}
