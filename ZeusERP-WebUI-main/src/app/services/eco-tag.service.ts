
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { endpoints } from '../plm/plm.endpoints';
import { EcoTag } from '../models/eco-tag.model';

@Injectable({providedIn: 'root'})
export class EcoTagService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  getEcoTagById(id: number): Observable<EcoTag> {
    return this.http.get<EcoTag>(`${endpoints.root}/${endpoints.ecoTagEndpoints.getAsync}/${id}`);
  }

  getAllEcoTags(): Observable<Array<EcoTag>> {
    return this.http.get<Array<EcoTag>>(`${endpoints.root}/${endpoints.ecoTagEndpoints.getAllAsync}`);
  }

  add(ecoTag: EcoTag): Observable<any> {
    return this.http.post<EcoTag>(`${endpoints.root}/${endpoints.ecoTagEndpoints.addAsync}`, ecoTag, this.httpOptions);
  }

  update(ecoTag: EcoTag): Observable<any> {
    console.log(ecoTag);
    return this.http.put<EcoTag>(`${endpoints.root}/${endpoints.ecoTagEndpoints.updateAsync}/${ecoTag.id}`, ecoTag);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<EcoTag>(`${endpoints.root}/${endpoints.ecoTagEndpoints.deleteAsync}/${id}`);
  }

  handleError(err: HttpErrorResponse) {
    console.error(err);
    return throwError(err);
  }

}
