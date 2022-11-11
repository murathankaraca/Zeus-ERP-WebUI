import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EcoTag } from 'src/app/models/eco-tag.model';
import { EcoTagService } from 'src/app/services/eco-tag.service';

@Component({
  selector: 'app-eco-tag-add',
  templateUrl: './eco-tag-add.component.html',
  styleUrls: ['./eco-tag-add.component.scss']
})
export class EcoTagAddComponent implements OnInit, OnDestroy {

  @ViewChild('btnsubmit', { read: ElementRef, static: false })
  btnsubmit: ElementRef<any>;

  ecoTagId: number;
  ecoTagForm: FormGroup;

  ecoTagSub: Subscription;
  ecoTagAddSub: Subscription;
  ecoTagUpdateSub: Subscription;

  routeParamSub: Subscription;

  color: any;
  touchUi: any;
  disabled: any;

  constructor(
    private fb: FormBuilder,
    private ecoTagService: EcoTagService,
    private router: Router,
    private route: ActivatedRoute) {
    this.ecoTagForm = this.fb.group({
      name: ['', [Validators.required]],
      colorCode: []
    });
    this.routeParamSub = this.route.params.subscribe(param => {
      this.ecoTagId = +param['id'];
    });
  }

  ngOnInit(): void {
    if (this.ecoTagId) {
      this.ecoTagSub = this.ecoTagService.getEcoTagById(this.ecoTagId)
      .pipe(
        tap(
          (data => {
            this.ecoTagForm.patchValue({
              name: data.name,
              colorCode: data.colorCode
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
    if(this.ecoTagSub) {
      this.ecoTagSub.unsubscribe();
    }
    if (this.ecoTagAddSub) {
      this.ecoTagAddSub.unsubscribe();
    }
    if (this.ecoTagUpdateSub) {
      this.ecoTagUpdateSub.unsubscribe();
    }
  }

  onSubmit(): any {
    if(this.ecoTagId) {
      const ecoTag: EcoTag = {
        id: this.ecoTagId,
        name: this.ecoTagForm.get('name').value,
        colorCode: String(this.ecoTagForm.get('colorCode').value)
      };
      this.ecoTagUpdateSub = this.ecoTagService.update(ecoTag).pipe(
        tap(
          (data => {
            this.router.navigate(['/', 'plm', 'eco-tags']);
          }),
          (err => {
            console.error(err);
            alert('There was an error with the update.');
          })
        )
      ).subscribe();
    } else {
      const ecoTag: EcoTag = {
        name: this.ecoTagForm.get('name').value,
        colorCode: String(this.ecoTagForm.get('colorCode').value)
      };
      this.ecoTagAddSub = this.ecoTagService.add(ecoTag).pipe(
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
