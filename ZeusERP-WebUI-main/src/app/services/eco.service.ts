
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './../models/product.model';
import { Observable, throwError } from 'rxjs';
import { endpoints } from '../plm/plm.endpoints';
import { EngineeringChangeOrder } from '../models/engineering-change-order.model';
import { EcoDetailsDto } from '../models/complex-types/eco-details.dto';
import { EcoStage } from '../models/enums/eco-stage.enum';

@Injectable({providedIn: 'root'})
export class EcoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  getEcoById(id: number): Observable<EngineeringChangeOrder> {
    return this.http.get<EngineeringChangeOrder>(`${endpoints.root}/${endpoints.ecoEndpoints.getAsync}/${id}`);
  }

  getAllEcos(): Observable<Array<EngineeringChangeOrder>> {
    return this.http.get<Array<EngineeringChangeOrder>>(`${endpoints.root}/${endpoints.ecoEndpoints.getAllAsync}`);
  }

  getEcoDetailsDto(id: number): Observable<EcoDetailsDto> {
    return this.http.get<EcoDetailsDto>(`${endpoints.root}/${endpoints.ecoEndpoints.getDetailsDtoAsync}/${id}`);
  }

  add(eco: EngineeringChangeOrder): Observable<any> {
    console.log(eco);
    return this.http.post<EngineeringChangeOrder>(`${endpoints.root}/${endpoints.ecoEndpoints.addAsync}`, eco, this.httpOptions);
  }

  update(eco: EngineeringChangeOrder): Observable<any> {
    return this.http.put<EngineeringChangeOrder>(`${endpoints.root}/${endpoints.ecoEndpoints.updateAsync}/${eco.id}`, eco);
  }

  updateStage(id: number, newStage: EcoStage): Observable<any> {
    return this.http.put<EngineeringChangeOrder>(`${endpoints.root}/${endpoints.ecoEndpoints.updateEcoStage}/${id}`, newStage);
  }

  delete(id: number):  Observable<any> {
    return this.http.delete<EngineeringChangeOrder>(`${endpoints.root}/${endpoints.ecoEndpoints.deleteAsync}/${id}`);
  }

  handleError(err: HttpErrorResponse) {
    console.error(err);
    return throwError(err);
  }

}
