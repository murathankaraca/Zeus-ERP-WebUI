import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ScrapDetailsDto } from 'src/app/models/complex-types/scrap-details.dto';
import { ScrapListDto } from 'src/app/models/complex-types/scrap-list.dto';
import { LocationService } from 'src/app/services/location.service';
import { ProductService } from 'src/app/services/product.service';
import { ScrapOrdersService } from 'src/app/services/scrap.service';

@Component({
  selector: 'app-scraps',
  templateUrl: './scraps.component.html',
  styleUrls: ['./scraps.component.scss']
})
export class ScrapsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'ScrapOrderCode',
    'ProductName',
    'ScrappedQuantity',
    'SourceLocationName',
    'ScrapLocationName',
    'ScrapStatus', 
    'details'
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  scrapOrdersListDto: Array<ScrapListDto>;
  scrapOrdersSub: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private scrapService: ScrapOrdersService,
    ) {
      this.scrapOrdersSub = this.scrapService.getScrapListDto().pipe(
        tap(
          (data => {
            this.scrapOrdersListDto = data;
            this.dataSource = new MatTableDataSource<ScrapListDto>(this.scrapOrdersListDto);
          }),
          (err => this.handleListDtoError(err))
        )
      ).subscribe();
    }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleListDtoError(err) {
    console.log(err);
  }

  navigateToScrap(id: number) {
    this.router.navigate(['/', 'inventory', 'orders', 'scraps', id]);
  }

  navigateToScrapAdd() {
    this.router.navigate(['/', 'inventory', 'orders', 'scraps', 'add']);
  }

  navigateToEditScrap(id: number) {
    this.router.navigate(['/', 'inventory', 'orders', 'scraps', 'edit', id]);
  }

  navigateToScrapLocation(locationId: number) {
    this.router.navigate(['/', 'inventory', 'locations', locationId]);
  }

  navigateToSourceLocation(locationId: number) {
    this.router.navigate(['/', 'inventory', 'locations', locationId]);
  }

  navigateToProduct(productId: number) {
    this.router.navigate(['/', 'inventory', 'products', productId]);
  }

  navigate(url) {
    this.router.navigate(url);
  }

}
