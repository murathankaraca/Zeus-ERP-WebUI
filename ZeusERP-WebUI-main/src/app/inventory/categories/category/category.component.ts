import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CategoryDetailsDto } from 'src/app/models/complex-types/category-details.dto';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'category-details',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  paramsSubscription : Subscription;

  categoryDetailsDto: CategoryDetailsDto;
  categoryDetailsSub: Subscription;

  @Input()
  showDetails: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      const id = +params["id"];
      this.categoryDetailsSub = this.categoryService.getCategoryDetailsDto(id).subscribe(c => {
        this.categoryDetailsDto = c;
        console.log(c);
      });
    });
  }

  ngOnDestroy(): void {
    if(this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  navigate(uri: string) {
    console.log('Called route is: ', uri);
    this.router.navigate([uri]);
  }
  
  deleteCategory() {
    this.categoryService.delete(this.categoryDetailsDto.categoryId).pipe(
      tap(
        data => { console.log(data); },
        err => { console.error(err); }
      )
    ).subscribe();
  }
}
