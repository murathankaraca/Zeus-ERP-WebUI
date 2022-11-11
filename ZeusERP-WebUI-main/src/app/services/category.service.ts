import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../inventory/inventory.endpoints';
import { Category } from '../models/category.model';
import { CategoryDetailsDto } from '../models/complex-types/category-details.dto';
import { CategoryListDto } from '../models/complex-types/category-list.dto';

@Injectable({providedIn: 'root'})
export class CategoryService {

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    constructor(private http: HttpClient) {
    }
    getCategoryById(id: number): Observable<Category> {
      return this.http.get<Category>(`${endpoints.root}/${endpoints.categoryEndpoints.getAsync}/${id}`);
    }
    getAllCategories(): Observable<Array<Category>> {
      return this.http.get<Array<Category>>(`${endpoints.root}/${endpoints.categoryEndpoints.getAllAsync}`);
    }
    getCategoryDetailsDto(id: number): Observable<CategoryDetailsDto> {
      return this.http.get<CategoryDetailsDto>(`${endpoints.root}/${endpoints.categoryEndpoints.getCategoryDetailsDtoAsync}/${id}`);
    }
    getCategoryListDto(): Observable<Array<CategoryListDto>> {
      return this.http.get<Array<CategoryListDto>>(`${endpoints.root}/${endpoints.categoryEndpoints.getCategoryListDtoAsync}`);
    }
    add(category: Category): Observable<any> {
      console.log(category);
      return this.http.post<Category>(`${endpoints.root}/${endpoints.categoryEndpoints.addAsync}`, category, this.httpOptions);
    }
  
    update(category: Category): Observable<any> {
      return this.http.put<Category>(`${endpoints.root}/${endpoints.categoryEndpoints.updateAsync}/${category.id}`, category);
    }
  
    delete(id: number):  Observable<any> {
      return this.http.delete<Category>(`${endpoints.root}/${endpoints.categoryEndpoints.deleteAsync}/${id}`);
    }
}
