import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product.model';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { CategoryDetailsDto } from 'src/app/models/complex-types/category-details.dto';
import { Subscription } from 'rxjs';
@Component({
  selector: 'category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnDestroy {

  routeSub: Subscription;

  categoryId: number;
  category: Category;

  categories: Array<Category>;
  categoriesSub: Subscription;

  categoryDetailsDto: CategoryDetailsDto;
  categoryDetailsSub: Subscription;

  @ViewChild('btnSubmit')
  btnSubmit: ElementRef;

  @Input()
  inDialogMode: boolean = false;

  @Output()
  AddCategory: EventEmitter<Category> = new EventEmitter<Category>();

  @Output()
  DiscardDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  categoryForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) { 
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
      parentCategory: []
    });

    this.categoriesSub = this.categoryService.getAllCategories().subscribe(c => {
      this.categories = c;
    });

    this.routeSub = this.route.params.subscribe(p => {
      if(p["id"] !== undefined) {
        const id: number = +p["id"];
        this.categoryId = id;
        console.log('Category ID is: ', id);

        this.categoryDetailsSub = this.categoryService
        .getCategoryDetailsDto(id).subscribe(c => {
          // Get Category Details and patch inputs with the data.
          this.categoryDetailsDto = c;
          this.categoryForm.patchValue({
            parentCategory: this.categoryDetailsDto.parentCategoryId,
            name: this.categoryDetailsDto.categoryName,
            description: this.categoryDetailsDto.categoryDescription
          });
        });
      }
    });
   }

  ngOnDestroy(): void {
    if (this.inDialogMode) {
      this.AddCategory.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.categoryDetailsSub) {
      this.categoryDetailsSub.unsubscribe();
    }
  }


  navigate(uri: any) {
    this.router.navigate(uri);
  }

  onSubmit() {
    const category: Category = {
      name: this.categoryForm.get('name').value,
      description: this.categoryForm.get('description').value,
      parentCategoryId: this.categoryForm.get('parentCategory').value,
    };

    if(this.categoryId) {
      category.id = this.categoryId;
      console.log("Edit will be done.");

      this.categoryService.update(category).subscribe(r => {
        console.log(r);
      });
    } else {
      console.log('[Category] Name: ' + this.categoryForm.get('name').value);
      console.log('[Category] Description: ' + this.categoryForm.get('description').value);
  
  
      if(this.inDialogMode) {
        this.AddCategory.emit(category);
      } else {
        // Add product to db.
        console.log('Category to Submit: ');
        console.log(category);
      }
      this.categoryService.add(category).subscribe(r => {
        console.log(r);
        this.navigate(['/','inventory','categories']);
      });
    }
  }

  onDiscard() {
    if (this.inDialogMode) {
      this.DiscardDialog.emit(true);
    }
  }


}
