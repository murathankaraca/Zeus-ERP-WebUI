import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EcoTag } from 'src/app/models/eco-tag.model';
import { EcoTagService } from 'src/app/services/eco-tag.service';

@Component({
  selector: 'app-eco-tags',
  templateUrl: './eco-tags.component.html',
  styleUrls: ['./eco-tags.component.scss']
})
export class EcoTagsComponent implements OnInit {

  ecoTagsSub: Subscription;
  ecoTags: Array<EcoTag>;

  constructor(private ecoTagService: EcoTagService, private router: Router) { }

  ngOnInit(): void {
    this.ecoTagsSub = this.ecoTagService.getAllEcoTags().pipe(
      tap(
        (data => {
          this.ecoTags = data;
        }),
        (err => {
          console.log(err);
          alert(err);
        })
      )
    ).subscribe();
  }

  navigateToEdit(id: number) {
    this.router.navigate(['/', 'plm', 'eco-tags', 'edit', id]);
  }

}
