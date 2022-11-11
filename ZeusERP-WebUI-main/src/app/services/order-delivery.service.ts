import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../inventory/inventory.endpoints';
import { DeliveryDetailsDto } from '../models/complex-types/delivery-details.dto';
import { DeliveryListDto } from '../models/complex-types/delivery-list.dto';
import { OrderDelivery } from '../models/order-delivery.model';

@Injectable({providedIn: 'root'})
export class DeliveryOrdersService {
    constructor(private http: HttpClient) {

    }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };

    getDeliveryById(id: number): Observable<OrderDelivery> {
        return this.http
        .get<OrderDelivery>(`${endpoints.root}/${endpoints.replenishmentEndpoints.getAsync}/${id}`);
    }

    getDeliveries(): Observable<Array<OrderDelivery>> {
        return this.http
        .get<Array<OrderDelivery>>(`${endpoints.root}/${endpoints.replenishmentEndpoints.getAllAsync}`);
    }

    getDeliveryDetails(): Observable<DeliveryDetailsDto> {
        return this.http
        .get<DeliveryDetailsDto>(`${endpoints.root}/${endpoints.replenishmentEndpoints.getReplenishmentOrdersDetailsDtoAsync}`);
    }

    getDeliveryList(): Observable<Array<DeliveryListDto>> {
        return this.http
        .get<Array<DeliveryListDto>>(`${endpoints.root}/${endpoints.replenishmentEndpoints.getReplenishmentOrdersListDtoAsync}`);
    }

    add(delivery: OrderDelivery): Observable<any> {
        return this.http.post<OrderDelivery>(`${endpoints.root}/${endpoints.deliveryEndpoints.addAsync}`, delivery, this.httpOptions);
    }
    update(delivery: OrderDelivery): Observable<any> {
        return this.http.put<OrderDelivery>(`${endpoints.root}/${endpoints.deliveryEndpoints.updateAsync}/${delivery.id}`, delivery);
    }
    delete(id: number): Observable<any> {
        return this.http.delete<OrderDelivery>(`${endpoints.root}/${endpoints.deliveryEndpoints.deleteAsync}/${id}`);
    }
}