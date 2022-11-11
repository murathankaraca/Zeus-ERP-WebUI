
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { errorCodes } from '../utils/error-codes.util';
import { Observable, throwError } from 'rxjs';
import { endpoints } from '../master/master.endpoints';
import { Contact } from '../models/contact.model';
@Injectable({providedIn: 'root'})
export class ContactService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${endpoints.root}/${endpoints.contactEndpoints.getAsync}/${id}`);
  }

  getAllContacts(): Observable<Array<Contact>> {
    return this.http.get<Array<Contact>>(`${endpoints.root}/${endpoints.contactEndpoints.getAllAsync}`);
  }
  

  add(contact: Contact): Observable<any> {
    console.log(contact);
    return this.http.post<Contact>(`${endpoints.root}/${endpoints.contactEndpoints.addAsync}`, contact, this.httpOptions);
  }

  update(contact: Contact): Observable<any> {
    return this.http.put<Contact>(`${endpoints.root}/${endpoints.contactEndpoints.updateAsync}/${contact.id}`, contact);
  }

  delete(id: number):  Observable<any> {
    return this.http.delete<Contact>(`${endpoints.root}/${endpoints.contactEndpoints.deleteAsync}/${id}`);
  }

}
