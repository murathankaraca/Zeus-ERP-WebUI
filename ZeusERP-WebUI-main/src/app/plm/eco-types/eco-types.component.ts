import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EcoType } from 'src/app/models/eco-type.model';
import { EcoTypeService } from 'src/app/services/eco-type.service';

@Component({
  selector: 'app-eco-types',
  templateUrl: './eco-types.component.html',
  styleUrls: ['./eco-types.component.scss']
})
export class EcoTypesComponent implements OnInit {

  ecoTypesSub: Subscription;
  ecoTypes: Array<EcoType>;

  constructor(private ecoTypeService: EcoTypeService, private router: Router) { }

  ngOnInit(): void {
    this.ecoTypesSub = this.ecoTypeService.getAllEcoTypes().pipe(
      tap(
        (data => {
          this.ecoTypes = data;
        }),
        (err => {

        })
      )
    ).subscribe();
  }

  navigateToEdit(id: number) {
    this.router.navigate(['/', 'plm', 'eco-types', 'edit', id]);
  }

}
