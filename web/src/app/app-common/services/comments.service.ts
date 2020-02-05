import {Injectable,EventEmitter} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';


import {Observable, throwError} from 'rxjs';
import {catchError, retry, finalize} from 'rxjs/operators';

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
    this.options = {params: new HttpParams({fromString: '_page=0&_limit=30'})};
  }

  public listComments(id:string) {
    return this.httpClient
               .get<Comment[]>(this.REST_API_SERVER + `${id}/comments`, this.options)
               .pipe(retry(this.RETRY_COUNT), catchError(this.handleError));
  }

  save(id:string, comment: Comment): Observable<Comment> {

    return this.httpClient.post<Comment>(this.REST_API_SERVER + `${id}/comments`, comment)
      .pipe(
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
