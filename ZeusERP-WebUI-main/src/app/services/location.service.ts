import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../inventory/inventory.endpoints';
import { LocationDetailsDto } from '../models/complex-types/location-details.dto';
import { LocationListDto } from '../models/complex-types/location-list.dto';
import { Location } from './../models/location.model';
@Injectable({
    providedIn: 'root'
})
export class LocationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }
  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${endpoints.root}/${endpoints.locationEndpoints.getAsync}/${id}`);
  }
  getAllLocations(): Observable<Array<Location>> {
    return this.http.get<Array<Location>>(`${endpoints.root}/${endpoints.locationEndpoints.getAllAsync}`);
  }
  getLocationDetailsDto(id: number): Observable<LocationDetailsDto> {
    return this.http.get<LocationDetailsDto>(`${endpoints.root}/${endpoints.locationEndpoints.getLocationDetailsDtoAsync}/${id}`);
  }
  getLocationListDto(): Observable<Array<LocationListDto>> {
    return this.http.get<Array<LocationListDto>>(`${endpoints.root}/${endpoints.locationEndpoints.getLocationListDtoAsync}`);
  }
  add(location: Location): Observable<any> {
    return this.http.post<Location>(`${endpoints.root}/${endpoints.locationEndpoints.addAsync}`, location, this.httpOptions);
  }

  update(location: Location): Observable<any> {
    return this.http.put<Location>(`${endpoints.root}/${endpoints.locationEndpoints.updateAsync}/${location.id}`, location);
  }

  delete(id: number):  Observable<any> {
    return this.http.delete<Location>(`${endpoints.root}/${endpoints.locationEndpoints.deleteAsync}/${id}`);
  }
}
