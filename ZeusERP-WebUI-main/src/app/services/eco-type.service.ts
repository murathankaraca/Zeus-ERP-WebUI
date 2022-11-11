
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './../models/product.model';
import { Observable, throwError } from 'rxjs';
import { endpoints } from '../plm/plm.endpoints';
import { EngineeringChangeOrder } from '../models/engineering-change-order.model';
import { EcoType } from '../models/eco-type.model';

@Injectable({providedIn: 'root'})
export class EcoTypeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  getEcoTypeById(id: number): Observable<EcoType> {
    return this.http.get<EcoType>(`${endpoints.root}/${endpoints.ecoTypeEndpoints.getAsync}/${id}`);
  }

  getAllEcoTypes(): Observable<Array<EcoType>> {
    return this.http.get<Array<EcoType>>(`${endpoints.root}/${endpoints.ecoTypeEndpoints.getAllAsync}`);
  }

  add(ecoType: EcoType): Observable<any> {
    return this.http.post<EcoType>(`${endpoints.root}/${endpoints.ecoTypeEndpoints.addAsync}`, ecoType, this.httpOptions);
  }

  update(ecoType: EcoType): Observable<any> {
    return this.http.put<EcoType>(`${endpoints.root}/${endpoints.ecoTypeEndpoints.updateAsync}/${ecoType.id}`, ecoType);
  }

  delete(id: number):  Observable<any> {
    return this.http.delete<EcoType>(`${endpoints.root}/${endpoints.ecoTypeEndpoints.deleteAsync}/${id}`);
  }

  handleError(err: HttpErrorResponse) {
    console.error(err);
    return throwError(err);
  }

}
