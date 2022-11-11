import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../inventory/inventory.endpoints';
import { WarehouseDetailsDto } from '../models/complex-types/warehouse-details.dto';
import { WarehouseListDto } from '../models/complex-types/warehouse-list.dto';
import { Warehouse } from '../models/warehouse.model';

@Injectable({ providedIn: 'root' })
export class WarehouseService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }
  getWarehouseById(id: number): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${endpoints.root}/${endpoints.warehouseEndpoints.getAsync}/${id}`);
  }
  getAllWarehouses(): Observable<Array<Warehouse>> {
    return this.http.get<Array<Warehouse>>(`${endpoints.root}/${endpoints.warehouseEndpoints.getAllAsync}`);
  }
  getWarehouseDetailsDto(id: number): Observable<WarehouseDetailsDto> {
    return this.http.get<WarehouseDetailsDto>(`${endpoints.root}/${endpoints.warehouseEndpoints.getWarehousesDetailsDtoAsync}/${id}`);
  }
  getWarehouseListDto(): Observable<Array<WarehouseListDto>> {
    return this.http.get<Array<WarehouseListDto>>(`${endpoints.root}/${endpoints.warehouseEndpoints.getWarehousesListDtoAsync}`);
  }
  add(warehouse: Warehouse): Observable<any> {
    return this.http.post<Warehouse>(`${endpoints.root}/${endpoints.warehouseEndpoints.addAsync}`, warehouse, this.httpOptions);
  }
  update(warehouse: Warehouse): Observable<any> {
    return this.http.put<Warehouse>(`${endpoints.root}/${endpoints.warehouseEndpoints.updateAsync}/${warehouse.id}`, warehouse);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<Warehouse>(`${endpoints.root}/${endpoints.warehouseEndpoints.deleteAsync}/${id}`);
  }
}
