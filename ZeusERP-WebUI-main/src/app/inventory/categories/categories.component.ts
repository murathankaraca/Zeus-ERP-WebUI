import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryListDto } from 'src/app/models/complex-types/category-list.dto';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnDestroy {

  categoryListDtos: Array<CategoryListDto>;
  categoryListSub: Subscription;

  failedLoading: boolean = false;
  finishedLoading: boolean = false;

  name: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router
    ) {
      this.categoryListSub = this.categoryService.getCategoryListDto().subscribe(
        c => {
          this.categoryListDtos = c;
          console.log(c);
          this.finishedLoading = true;
        },
        error => this.onRetrievalError(error)
      );
    }

  ngOnDestroy(): void {
    if(this.categoryListSub) {
      this.categoryListSub.unsubscribe();
    }
  }

  onRetrievalError(error: HttpErrorResponse) {
    console.error('An error was encountered during the "Category" request.');
    console.error(error);
    this.finishedLoading = true;
  }

  addCategory() {
    this.router.navigate(['/', 'inventory', 'categories' , 'add']);
  }

  editCategory(categoryId: number) {
    this.router.navigate(['/', 'inventory', 'categories' , 'edit', categoryId]);
  }

  showCategoryDetails(categoryId: number) {
    this.router.navigate(['/', 'inventory', 'categories', categoryId]);
  }

}
