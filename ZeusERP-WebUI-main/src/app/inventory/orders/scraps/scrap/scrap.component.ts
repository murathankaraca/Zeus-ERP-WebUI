import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ScrapDetailsDto } from 'src/app/models/complex-types/scrap-details.dto';
import { ProductService } from 'src/app/services/product.service';
import { ScrapOrdersService } from 'src/app/services/scrap.service';
import { CreateProductDialog } from 'src/app/shared/dialogs/create-item/create-product-dialog/create-product-dialog';
@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.scss']
})
export class ScrapComponent implements OnInit, OnDestroy {

  routeSubscription : Subscription;

  scrapDetails: ScrapDetailsDto;
  scrapDetailsSub: Subscription;

  createProductDialogSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private scrapService: ScrapOrdersService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      const id = +params["id"];
      if(id) {
        this.scrapDetailsSub = this.scrapService.getScrapDetailsDto(id).pipe(
          tap(
            (scrapDetails => {
              this.scrapDetails = scrapDetails
            }),
            (err => console.log(err))
          )
        ).subscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    if(this.scrapDetailsSub) {
      this.scrapDetailsSub.unsubscribe();
    }
  }

  navigate(uri: string) {
    console.log('Called route is: ', uri);
    this.router.navigate([uri]);
  }

  openDialog(): void {

    this.createProductDialogSub = this.productService.getProductById(this.scrapDetails.productId).subscribe(
      p => {
        const dialogRef = this.dialog.open(CreateProductDialog, {
          width: '300px',
          data: p,
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log("[CreateProductDialog]");
          console.log(result);
          this.createProductDialogSub.unsubscribe();
        });
      }
    );

  }

}
