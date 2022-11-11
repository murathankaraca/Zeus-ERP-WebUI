import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationDetailsDto } from 'src/app/models/complex-types/location-details.dto';
import { Product } from 'src/app/models/product.model';
import { LocationService } from 'src/app/services/location.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'location-details',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {

  paramsSubscription: Subscription;

  locationDetails: LocationDetailsDto;
  locationDetailsSub: Subscription;

  locationImageUrl: string;

  @Input()
  showDetails: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      const id = +params["id"];
      this.locationDetailsSub = this.locationService.getLocationDetailsDto(id).subscribe(l => {
        this.locationDetails = l;
      });
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  navigate(uri: string[]) {
    this.router.navigate(uri);
  }

}
