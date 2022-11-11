import { OrderReplenishment } from '../models/order-replenishment.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpoints } from '../inventory/inventory.endpoints';
import { ReplenishmentDetailsDto } from '../models/complex-types/replenishment-details.dto';
@Injectable({
  providedIn: 'root'
})
export class OrderReplenishmentService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };

    constructor(private http: HttpClient) {

    }

    getReplenishmentById(id: number): Observable<OrderReplenishment> {
        return this.http
        .get<OrderReplenishment>(`${endpoints.root}/${endpoints.replenishmentEndpoints.getAsync}/${id}`);
    }

    getReplenishments(): Observable<Array<OrderReplenishment>> {
        return this.http
        .get<Array<OrderReplenishment>>(`${endpoints.root}/${endpoints.replenishmentEndpoints.getAllAsync}`);
    }

    getReplenishmentDetailsById(id: number): Observable<ReplenishmentDetailsDto> {
        return this.http
        .get<ReplenishmentDetailsDto>(`${endpoints.root}/${endpoints.replenishmentEndpoints.getReplenishmentOrdersDetailsDtoByIdAsync}/${id}`);
    }

    getReplenishmentDetails(): Observable<Array<ReplenishmentDetailsDto>> {
        return this.http
        .get<Array<ReplenishmentDetailsDto>>(`${endpoints.root}/${endpoints.replenishmentEndpoints.getReplenishmentOrdersDetailsDtoAsync}`);
    }

    add(replenishment: OrderReplenishment): Observable<any> {
        return this.http.post<OrderReplenishment>(`${endpoints.root}/${endpoints.replenishmentEndpoints.addAsync}`, replenishment, this.httpOptions);
    }
    update(replenishment: OrderReplenishment): Observable<any> {
        return this.http.put<OrderReplenishment>(`${endpoints.root}/${endpoints.replenishmentEndpoints.updateAsync}/${replenishment.id}`, replenishment);
    }
    delete(id: number): Observable<any> {
        return this.http.delete<OrderReplenishment>(`${endpoints.root}/${endpoints.replenishmentEndpoints.deleteAsync}/${id}`);
    }
}
