import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../inventory/inventory.endpoints';
import { ScrapDetailsDto } from '../models/complex-types/scrap-details.dto';
import { ScrapListDto } from '../models/complex-types/scrap-list.dto';
import { Scrap } from '../models/scrap.model';


@Injectable({
    providedIn: 'root'
})
export class ScrapOrdersService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }
  getScrapById(id: number): Observable<Scrap> {
    return this.http.get<Scrap>(`${endpoints.root}/${endpoints.scrapEndpoints.getAsync}/${id}`);
  }
  getAllScraps(): Observable<Array<Scrap>> {
    return this.http.get<Array<Scrap>>(`${endpoints.root}/${endpoints.scrapEndpoints.getAllAsync}`);
  }
  getScrapDetailsDto(id: number): Observable<ScrapDetailsDto> {
    return this.http.get<ScrapDetailsDto>(`${endpoints.root}/${endpoints.scrapEndpoints.getScrapOrdersDetailsDtoAsync}/${id}`);
  }
  getScrapListDto(): Observable<Array<ScrapListDto>> {
    return this.http.get<Array<ScrapListDto>>(`${endpoints.root}/${endpoints.scrapEndpoints.getScrapOrdersListDtoAsync}`);
  }
  add(scrap: Scrap): Observable<any> {
    return this.http.post<Scrap>(`${endpoints.root}/${endpoints.scrapEndpoints.addAsync}`, scrap, this.httpOptions);
  }

  update(scrap: Scrap): Observable<any> {
    return this.http.put<Scrap>(`${endpoints.root}/${endpoints.scrapEndpoints.updateAsync}/${scrap.id}`, scrap);
  }

  delete(id: number):  Observable<any> {
    return this.http.delete<Scrap>(`${endpoints.root}/${endpoints.scrapEndpoints.deleteAsync}/${id}`);
  }

}
