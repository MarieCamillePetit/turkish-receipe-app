import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Receipe } from '../models/receipe';

@Injectable()
export class ReceipeService {
  constructor(private http: HttpClient) {}

  get(): Observable<Receipe[]> {
    return this.http.get<Receipe[]>(
      environment.receipeApiBaseUrl + '/receipes'
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(
      environment.receipeApiBaseUrl + '/receipes/' + id
    );
  }

  update(receipe: Receipe): Observable<string> {
    return this.http.put<string>(
      environment.receipeApiBaseUrl + '/receipes/' + receipe.id,
      receipe
    );
  }

  create(receipe: Receipe): Observable<string> {
    return this.http.post<string>(
      environment.receipeApiBaseUrl + '/receipes',
      receipe
    );
  }

  getById(id: number): Observable<Receipe> {
    return this.http.get<Receipe>(
      environment.receipeApiBaseUrl + '/receipes/' + id
    );
  }
}
