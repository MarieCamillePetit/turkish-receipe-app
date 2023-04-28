import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  get(): Observable<Category[]> {
    return this.http.get<Category[]>(
      environment.receipeApiBaseUrl + '/categories'
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(
      environment.receipeApiBaseUrl + '/categories/' + id
    );
  }

  update(category: Category): Observable<string> {
    return this.http.put<string>(
      environment.receipeApiBaseUrl + '/categories/' + category.id,
      category
    );
  }

  create(category: Category): Observable<string> {
    return this.http.post<string>(
      environment.receipeApiBaseUrl + '/categories',
      category
    );
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(
      environment.receipeApiBaseUrl + '/categories/' + id
    );
  }
}
