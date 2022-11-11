import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BomListDto } from 'src/app/models/complex-types/bom-list.dto';
import { BomsService } from 'src/app/services/bom.service';

@Component({
  selector: 'app-bom',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.scss']
})
export class BomComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['reference', 'productName', 'quantity', 'details'];


  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  bomListSub: Subscription;
  bomListDto: Array<BomListDto>;

  dataSource: MatTableDataSource<BomListDto> = new MatTableDataSource<BomListDto>();

  constructor(
    private bomService: BomsService,
    private route: ActivatedRoute,
    private router: Router,
    ) {

  }

  ngOnInit(): void {
    this.bomListSub = this.bomService.getBomListDto()
    .pipe(
      tap(
        data => {
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        err => console.error(err)
      )
    ).subscribe();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.bomListSub.unsubscribe();
    this.dataSource = null;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToAdd() {
    this.router.navigate(['/', 'manufacturing', 'boms', 'add']);
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/', 'manufacturing', 'boms', id.toString()]);
  }

  navigateToEdit(id: number) {
    this.router.navigate(['/', 'manufacturing', 'boms', 'edit', id.toString()]);
  }

}
