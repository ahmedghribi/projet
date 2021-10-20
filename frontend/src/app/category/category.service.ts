import { Category } from './category';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiURL = "http://127.0.0.1:1233/api/v1/category/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  create(Category:any): Observable<Category> {
    return this.httpClient.post<Category>(this.apiURL, JSON.stringify(Category), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  find(id:any): Observable<Category> {
    return this.httpClient.get<Category>(this.apiURL + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  update(id:any, Category:any): Observable<Category> {
    return this.httpClient.put<Category>(this.apiURL + id, JSON.stringify(Category), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  delete(id:any){
    return this.httpClient.delete<Category>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
