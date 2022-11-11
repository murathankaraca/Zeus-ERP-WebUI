import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../manufacturing/manufacturing.endpoints';
import { BillOfMaterials } from '../models/bom.model';
import { BomDetailsDto } from '../models/complex-types/bom-details.dto';
import { BomListDto } from '../models/complex-types/bom-list.dto';

@Injectable({providedIn: 'root'})
export class BomsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }
  getBomById(id: number): Observable<BillOfMaterials> {
    return this.http.get<BillOfMaterials>(`${endpoints.root}/${endpoints.bomEndpoints.getAsync}/${id}`);
  }
  getAllBom(): Observable<Array<BillOfMaterials>> {
    return this.http.get<Array<BillOfMaterials>>(`${endpoints.root}/${endpoints.bomEndpoints.getAllAsync}`);
  }
  getBomDetailsDto(id: number): Observable<BomDetailsDto> {
    return this.http.get<BomDetailsDto>(`${endpoints.root}/${endpoints.bomEndpoints.getBomDetailsDtoAsync}/${id}`);
  }
  getBomListDto(): Observable<Array<BomListDto>> {
    return this.http.get<Array<BomListDto>>(`${endpoints.root}/${endpoints.bomEndpoints.getBomListDtoAsync}`);
  }
  add(bom: BillOfMaterials): Observable<any> {
    return this.http.post<BillOfMaterials>(`${endpoints.root}/${endpoints.bomEndpoints.addAsync}`, bom, this.httpOptions);
  }
  update(bom: BillOfMaterials): Observable<any> {
    return this.http.put<BillOfMaterials>(`${endpoints.root}/${endpoints.bomEndpoints.updateAsync}/${bom.id}`, bom);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<BillOfMaterials>(`${endpoints.root}/${endpoints.bomEndpoints.deleteAsync}/${id}`);
  }
}
