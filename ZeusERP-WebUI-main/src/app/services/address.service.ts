import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../inventory/inventory.endpoints';
import { Address } from './../models/address.model';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  
  constructor(private http: HttpClient) {
  }
  getAddressById(id: number): Observable<Address> {
    return this.http.get<Address>(`${endpoints.root}/${endpoints.addressEndpoints.getAsync}/${id}`);
  }
  getAllAddresses(): Observable<Array<Address>> {
    return this.http.get<Array<Address>>(`${endpoints.root}/${endpoints.addressEndpoints.getAllAsync}`);
  }
  add(address: Address): Observable<any> {
    return this.http.post<Address>(`${endpoints.root}/${endpoints.addressEndpoints.addAsync}`, address, this.httpOptions);
  }

  update(address: Address): Observable<any> {
    return this.http.put<Address>(`${endpoints.root}/${endpoints.addressEndpoints.updateAsync}/${address.id}`, address);
  }

  delete(id: number):  Observable<any> {
    return this.http.delete<Address>(`${endpoints.root}/${endpoints.addressEndpoints.deleteAsync}/${id}`);
  }
}