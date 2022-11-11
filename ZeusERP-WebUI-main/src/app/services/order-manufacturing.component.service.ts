import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { endpoints } from "../manufacturing/manufacturing.endpoints";
import { ManufacturingComponentDetailsDto } from "../models/complex-types/manufacturing-component-details.dto";
import { ManufacturingOrderComponent } from "../models/manufacturing-component.model";

@Injectable({providedIn: 'root'})
export class ManufacturingComponentService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      constructor(private http: HttpClient) {
      }
      getComponentById(id: number): Observable<ManufacturingOrderComponent> {
        return this.http.get<ManufacturingOrderComponent>(`${endpoints.root}/${endpoints.manufacturingEndpoints.componentGetAsync}/${id}`);
      }
      getAllComponents(): Observable<Array<ManufacturingOrderComponent>> {
        return this.http.get<Array<ManufacturingOrderComponent>>(`${endpoints.root}/${endpoints.manufacturingEndpoints.componentGetAllAsync}`);
      }
      getManuCompDetailsDtoByOrderId(id: number): Observable<Array<ManufacturingComponentDetailsDto>> {
        return this.http.get<Array<ManufacturingComponentDetailsDto>>(`${endpoints.root}/${endpoints.manufacturingEndpoints.componentListByOrderIdAsync}/${id}`);
      }
      add(order: ManufacturingOrderComponent): Observable<any> {
        return this.http.post<ManufacturingOrderComponent>(`${endpoints.root}/${endpoints.manufacturingEndpoints.componentAddAsync}`, order, this.httpOptions);
      }
      update(order: ManufacturingOrderComponent): Observable<any> {
        return this.http.put<ManufacturingOrderComponent>(`${endpoints.root}/${endpoints.manufacturingEndpoints.componentUpdateAsync}/${order.id}`, order);
      }
      delete(id: number): Observable<any> {
        return this.http.delete<ManufacturingOrderComponent>(`${endpoints.root}/${endpoints.manufacturingEndpoints.componentDeleteAsync}/${id}`);
      }
}