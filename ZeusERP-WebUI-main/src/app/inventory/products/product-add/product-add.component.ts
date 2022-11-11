import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product.model';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsDto } from 'src/app/models/complex-types/product-details.dto';
import { stringify } from 'querystring';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { tap } from 'rxjs/operators';
import { decimalPattern } from 'src/app/utils/regexp.pattern';
@Component({
  selector: 'product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit, AfterViewInit, OnDestroy {

  productImageUrl: string;

  productId: number;
  
  product: Product;
  productSub: Subscription;

  productDetails: ProductDetailsDto;
  productDetailsSub: Subscription;

  categories: Array<Category>;
  categoriesSub: Subscription;

  productTypes: Array<object> = [
    {id: 0, value: "Producable"},
    {id: 1, value: "Consumable"},
  ];

  @ViewChild('btnSubmit')
  btnSubmit: ElementRef;

  @Input()
  inDialogMode: boolean = false;

  @Output()
  AddProduct: EventEmitter<Product> = new EventEmitter<Product>();

  @Output()
  DialogDiscard: EventEmitter<boolean> = new EventEmitter<boolean>();

  productForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      categoryId: [],
      description: [''],
      productType: [0],
      canBePurchased: [Boolean(false)],
      canBeSold: [Boolean(false)],
      barcodeNumber: [''],
      unitCount: [0.000, [Validators.pattern(decimalPattern)]],
      unitPrice: [0.000, [Validators.pattern(decimalPattern)]],
      unitCost: [0.000, [Validators.pattern(decimalPattern)]],
      volume: [0.000, [Validators.pattern(decimalPattern)]],
      weight: [0.000, [Validators.pattern(decimalPattern)]],
      imgPath: [''],
    });
   }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.productId = +param['id'];

      // Load all categories.
      this.categoriesSub = this.categoryService.getAllCategories().subscribe(c => {
        this.categories = c;
      });


      // If an id parameter was given during routing.
      if (this.productId) {

        console.log('There is a parameter. Id is: ' + this.productId);

        this.productDetailsSub = this.productService.getProductDetailsDto(this.productId).subscribe(p => {
          if(p) {
            this.productDetails = p;
          }
        });


        this.productSub = this.productService.getProductById(this.productId).subscribe(p => {
          if(p) {
            console.log('Fetched product is: ');
            console.log(p);
            this.product = p;

            // Setting up the form values.
            this.productForm.get('name').setValue(p.name);
            this.productForm.get('description').setValue(p.description);
            this.productForm.get('unitCost').setValue(p.unitCost.toFixed(3));
            this.productForm.get('unitCount').setValue(p.unitCount.toFixed(3));
            this.productForm.get('unitPrice').setValue(p.unitPrice.toFixed(3));
            // this.productForm.get("productType").setValue(fetchedProduct.type);
            this.productForm.get('volume').setValue(p.volume.toFixed(3));
            this.productForm.get('weight').setValue(p.weight.toFixed(3));
            this.productForm.get('canBePurchased').setValue(p.canBePurchased);
            this.productForm.get('canBeSold').setValue(p.canBeSold);
            this.productForm.patchValue({
              categoryId: p['categoryId']
            });
          }
        });
      }
    })
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    if(this.productSub) {
      this.productSub.unsubscribe();
    }
    if(this.productDetailsSub) {
      this.productDetailsSub.unsubscribe();
    }
    if(this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }



  }

  onSubmit() {

    const product: Product = {
      name: this.productForm.get('name').value,
      categoryId: this.productForm.get('categoryId').value,
      description: this.productForm.get('description').value,
      unitCost: Number(this.productForm.get('unitCost').value),
      unitCount: Number(this.productForm.get('unitCount').value),
      unitPrice: Number(this.productForm.get('unitPrice').value),
      type: this.productForm.get('productType').value,
      volume: Number(this.productForm.get('volume').value),
      weight: Number(this.productForm.get('weight').value),
      canBePurchased: this.productForm.get('canBePurchased').value,
      canBeSold: this.productForm.get('canBeSold').value,
    };

    if(this.productId) {
      
      product.id = this.productId;

      if(this.inDialogMode) {
        this.AddProduct.emit(product);
      } else {
        
        // Add product to db.
        this.productService.update(product)
        .pipe(
          tap(
            data => { console.log(data); this.navigate(['/','inventory','products']); },
            error => this.catchProductAddError(error)
          )
        ).subscribe();
  
      }
    } else {

      if(this.inDialogMode) {
        this.AddProduct.emit(product);
      } else {
        // Add product to db.
        this.productService.add(product)
        .pipe(
          tap(
            data => { console.log(data); this.navigate(['/','inventory','products']); },
            error => this.catchProductAddError(error)
          )
        ).subscribe();
  
      }
    }
  }

  catchProductAddError(err: string) {
    console.warn("Some of the values you have entered are incorrect. Error:");
    console.error(err);
  }

  onDiscard() {
    if(this.inDialogMode) {
      this.DialogDiscard.emit(true);
    }
  }

  navigateToCreateCategories() {
    this.router.navigate(['/', 'inventory', 'categories', 'add']);
  }

  navigate(url) {
    this.router.navigate(url);
  }


}
