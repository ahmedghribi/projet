import { ArticleInCategory } from './article-in-category';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private ArticleCategoryAPI = "http://127.0.0.1:1233/api/v1/ArticlesInCategory";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ArticleInCategory[]> {
    return this.httpClient.get<ArticleInCategory[]>(this.ArticleCategoryAPI)
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
