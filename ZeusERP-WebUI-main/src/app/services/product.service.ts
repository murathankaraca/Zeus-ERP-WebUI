
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetailsDto } from '../models/complex-types/product-details.dto';
import { ProductListDto } from '../models/complex-types/product-list.dto';
import { BomType } from '../models/enums/bom-type.enum';
import { Product } from './../models/product.model';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { errorCodes } from '../utils/error-codes.util';
import { Observable, throwError } from 'rxjs';
import { endpoints } from '../inventory/inventory.endpoints';

@Injectable({providedIn: 'root'})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${endpoints.root}/${endpoints.productEndpoints.getAsync}/${id}`);
  }

  getAllProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${endpoints.root}/${endpoints.productEndpoints.getAllAsync}`);
  }

  getProductDetailsDto(id: number): Observable<ProductDetailsDto> {
    return this.http.get<ProductDetailsDto>(`${endpoints.root}/${endpoints.productEndpoints.getProductDetailsDtoAsync}/${id}`);
  }


  getProductListDto(): Observable<Array<ProductListDto>> {
    return this.http.get<Array<ProductListDto>>(`${endpoints.root}/${endpoints.productEndpoints.getProductListDtoAsync}`);
  }

  add(product: Product): Observable<any> {
    console.log(product);
    return this.http.post<Product>(`${endpoints.root}/${endpoints.productEndpoints.addAsync}`, product, this.httpOptions);
  }

  update(product: Product): Observable<any> {
    return this.http.put<Product>(`${endpoints.root}/${endpoints.productEndpoints.updateAsync}/${product.id}`, product);
  }

  delete(id: number):  Observable<any> {
    return this.http.delete<Product>(`${endpoints.root}/${endpoints.productEndpoints.deleteAsync}/${id}`);
  }

  handleError(err: HttpErrorResponse) {
    console.error(err);
    return throwError(err);
  }

}
