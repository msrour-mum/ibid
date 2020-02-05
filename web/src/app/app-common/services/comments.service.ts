import {Injectable,EventEmitter} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';


import {Observable, throwError} from 'rxjs';
import {catchError, retry, finalize, map} from 'rxjs/operators';

import {Comment} from '../../models/comments';
import {AppConfig} from '../../config/app.config';



@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  private REST_API_SERVER: string;
  private options;
  private RETRY_COUNT : number;
  public newCommentEmitter = new EventEmitter<any>();

/**
 * Creates an instance of comments service, and intializing url, options
 * @param httpClient => dependency injection
 */
constructor(private httpClient: HttpClient) {

    this.REST_API_SERVER = AppConfig.settings.apiServiceUrl + 'auctions/';
    this.RETRY_COUNT = AppConfig.settings.retryCount;
    
  }

  public listComments(
    id:string, 
    limit:number= 10, 
    page:number = 0){

    this.options = {params: new HttpParams({fromString: `_page=${page}&_limit=${limit}`})};

    return this.httpClient
               .get<Comment[]>(this.REST_API_SERVER + `${id}/comments`, this.options)
               .pipe( map((result: any) => result.data),
                 retry(this.RETRY_COUNT), catchError(this.handleError));
  }

  save(id:string, comment: Comment): Observable<Comment> {

    return this.httpClient.post<Comment>(this.REST_API_SERVER + `${id}/comments`, comment)
      .pipe(
        map((result: any) => result.data),
        retry(this.RETRY_COUNT),
        catchError(this.handleError)
      );
  }





/**
 * Shall be removed, centerlized in one place
 */
handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
