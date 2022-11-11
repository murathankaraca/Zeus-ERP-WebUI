import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EngineeringChangeOrder } from 'src/app/models/engineering-change-order.model';
import { EcoStage } from 'src/app/models/enums/eco-stage.enum';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { EcoService } from 'src/app/services/eco.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-eco-add',
  templateUrl: './eco-add.component.html',
  styleUrls: ['./eco-add.component.scss']
})
export class EcoAddComponent implements OnInit, OnDestroy, AfterViewInit {

  ecoId: number;
  ecoForm: FormGroup;

  ecoDetailsSub: Subscription;
  ecoAddSub: Subscription;
  ecoUpdateSub: Subscription;
  paramsSub: Subscription;

  users: Array<User>;
  userSub: Subscription;

  products: Array<Product>;
  productsSub: Subscription;

  constructor(
    private ecoService: EcoService,
    private userService: UserService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) {
      this.productsSub = this.productService.getAllProducts().pipe(
        tap(
          (data => {
            this.products = data;
          }),
          (err => {
            console.log(err);
            alert(err);
          })
        )
      ).subscribe();
      this.userSub = this.userService.getAllUsers().pipe(
        tap(
          (data => {
            console.log(data);
            this.users = data;
          }),
          (err => {
            alert('No user accounts were found.');
          })
        )
      ).subscribe();
      this.paramsSub = this.route.params.subscribe(params => {
        this.ecoId = +params['id'];
      });
      this.ecoForm = this.fb.group({
        summary: [],
        responsibleId: [''],
        applyOn: [],
        productId: [],
        effectivity: [],
        effectivityDate: [],
        approverId: [''],
        note: [''],
      });
  }

  ngOnInit(): void {
    if (this.ecoId) {
      console.log('Edit mode is activated.');
      console.log(this.ecoForm);
      this.ecoDetailsSub = this.ecoService.getEcoDetailsDto(this.ecoId).pipe(
        tap(
          (data => {
            console.table(data);
            this.ecoForm.patchValue({
              summary: data.summary,
              applyOn: data.applyOn,
              effectivity: data.effectivity,
              note: data.note
            });
            this.ecoForm.get('productId').setValue(data.productId);
            this.ecoForm.get('approverId').setValue(data.approverName);
            this.ecoForm.get('responsibleId').setValue(data.responsibleName);
            this.ecoForm.get('effectivity').setValue(Number(data.effectivity));
            this.ecoForm.get('applyOn').setValue(Number(data.applyOn));
          }),
          (err => {
            console.log(err);
          })
        )
      ).subscribe();

    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (this.ecoDetailsSub) {
      this.ecoDetailsSub.unsubscribe();
    }
    if (this.ecoAddSub) {
      this.ecoAddSub.unsubscribe();
    }
    if (this.ecoUpdateSub) {
      this.ecoUpdateSub.unsubscribe();
    }
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onSubmit(): void {
    console.log(this.ecoForm);
    if (this.ecoId) {
      const eco: EngineeringChangeOrder = {
        id: this.ecoId,
        summary: this.ecoForm.get('summary').value,
        responsibleId: this.ecoForm.get('responsibleId').value,
        applyOn: Boolean(this.ecoForm.get('applyOn').value),
        productId: Number(this.ecoForm.get('productId').value),
        effectivity: Boolean(this.ecoForm.get('effectivity').value),
        note: this.ecoForm.get('note').value,
        approverId: this.ecoForm.get('approverId').value,
        ecoStage: EcoStage.NEW,
      };
      console.log(eco);
      this.ecoUpdateSub = this.ecoService.update(eco).pipe(
        tap(
          (data => {
            console.log(data);
          }),
          (err => {
            console.error(err);
          })
        )
      ).subscribe();
    } else {
      const eco: EngineeringChangeOrder = {
        summary: this.ecoForm.get('summary').value,
        responsibleId: this.ecoForm.get('responsibleId').value,
        applyOn: Boolean(this.ecoForm.get('applyOn').value),
        productId: Number(this.ecoForm.get('productId').value),
        effectivity: Boolean(this.ecoForm.get('effectivity').value),
        note: this.ecoForm.get('note').value,
        approverId: this.ecoForm.get('approverId').value,
        ecoStage: EcoStage.NEW,
      };
      this.ecoAddSub = this.ecoService.add(eco).pipe(
        tap(
          (data => {
            console.log(data);
          }),
          (err => {
            console.error(err);
          })
        )
      ).subscribe();
    }
  }

  onDiscard(): void {
    this.router.navigate(['/']);
  }

}
