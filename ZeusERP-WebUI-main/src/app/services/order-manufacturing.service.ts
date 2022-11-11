import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { endpoints } from "../manufacturing/manufacturing.endpoints";
import { ManufacturingDetailsDto } from "../models/complex-types/manufacturing-details.dto";
import { ManufacturingListDto } from "../models/complex-types/manufacturing-list.dto";
import { OrderManufacturing } from "../models/order-manufacturing.model";

@Injectable({providedIn: 'root'})
export class ManufacturingOrderService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      constructor(private http: HttpClient) {
      }
      getOrderById(id: number): Observable<OrderManufacturing> {
        return this.http.get<OrderManufacturing>(`${endpoints.root}/${endpoints.manufacturingEndpoints.getAsync}/${id}`);
      }
      getAllOrders(): Observable<Array<OrderManufacturing>> {
        return this.http.get<Array<OrderManufacturing>>(`${endpoints.root}/${endpoints.manufacturingEndpoints.getAllAsync}`);
      }
      getOrderDetailsDto(id: number): Observable<ManufacturingDetailsDto> {
        return this.http.get<ManufacturingDetailsDto>(`${endpoints.root}/${endpoints.manufacturingEndpoints.getManufacturingOrdersDetailsDtoAsync}/${id}`);
      }
      getOrderListDto(id: number): Observable<ManufacturingListDto> {
        return this.http.get<ManufacturingListDto>(`${endpoints.root}/${endpoints.manufacturingEndpoints.getManufacturingOrdersListDtoAsync}/${id}`);
      }
      add(order: OrderManufacturing): Observable<any> {
        return this.http.post<OrderManufacturing>(`${endpoints.root}/${endpoints.manufacturingEndpoints.addAsync}`, order, this.httpOptions);
      }
      update(order: OrderManufacturing): Observable<any> {
        return this.http.put<OrderManufacturing>(`${endpoints.root}/${endpoints.manufacturingEndpoints.updateAsync}/${order.id}`, order);
      }
      delete(id: number): Observable<any> {
        return this.http.delete<OrderManufacturing>(`${endpoints.root}/${endpoints.manufacturingEndpoints.deleteAsync}/${id}`);
      }
}