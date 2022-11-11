import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../manufacturing/manufacturing.endpoints';
import { BillOfMaterialComponent } from '../models/bom-component.model';
import { BillOfMaterials } from '../models/bom.model';
import { BomComponentDetailsDto } from '../models/complex-types/bom-component.dto';
import { BomDetailsDto } from '../models/complex-types/bom-details.dto';
import { BomListDto } from '../models/complex-types/bom-list.dto';

@Injectable({providedIn: 'root'})
export class BomComponentService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }
  getBomComponentById(id: number): Observable<BillOfMaterialComponent> {
    return this.http.get<BillOfMaterialComponent>(`${endpoints.root}/${endpoints.bomEndpoints.componentGetAsync}/${id}`);
  }
  getAllBomComponents(): Observable<Array<BillOfMaterialComponent>> {
    return this.http.get<Array<BillOfMaterialComponent>>(`${endpoints.root}/${endpoints.bomEndpoints.componentGetAllAsync}`);
  }

  getAllBomComponentsByOrderId(id: number): Observable<Array<BomComponentDetailsDto>>  {
    return this.http.get<Array<BomComponentDetailsDto>>(`${endpoints.root}/${endpoints.bomEndpoints.componentListByOrderIdAsync}/${id}`);
  }

  getBomComponentDetailsDto(id: number): Observable<Array<BomComponentDetailsDto>> {
    return this.http.get<Array<BomComponentDetailsDto>>(`${endpoints.root}/${endpoints.bomEndpoints.componentDetailsAsync}/${id}`);
  }
  add(bom: BillOfMaterialComponent): Observable<any> {
    return this.http.post<BillOfMaterials>(`${endpoints.root}/${endpoints.bomEndpoints.componentAddAsync}`, bom, this.httpOptions);
  }
  update(bom: BillOfMaterialComponent): Observable<any> {
    return this.http.put<BillOfMaterials>(`${endpoints.root}/${endpoints.bomEndpoints.componentUpdateAsync}/${bom.id}`, bom);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<BillOfMaterials>(`${endpoints.root}/${endpoints.bomEndpoints.componentDeleteAsync}/${id}`);
  }
}
