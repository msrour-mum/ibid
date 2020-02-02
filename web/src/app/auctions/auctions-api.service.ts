import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Auction} from './auction';
import {AppConfig} from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuctionsApiService {
  private REST_API_SERVER: string;

  constructor(private httpClient: HttpClient) {
    this.REST_API_SERVER = AppConfig.settings.apiServiceUrl + 'auctions';
  }

  public list() {
    const options = {params: new HttpParams({fromString: '_page=1&_limit=30'})};
    return this.httpClient.get<Auction[]>(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));
  }
  public search(query) {
    const options = {params: new HttpParams({fromString: '_page=1&_limit=30'})};
    return this.httpClient.get<Auction[]>(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));
  }
  public listComment(id) {
    const options = {params: new HttpParams({fromString: '_page=1&_limit=30'})};
    return this.httpClient.get<Auction[]>(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));
  }
  public listbids(id) {
    const options = {params: new HttpParams({fromString: '_page=1&_limit=30'})};
    return this.httpClient.get<Auction[]>(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));
  }


  save(auction: Auction): Observable<Auction> {
    return this.httpClient.post<Auction>(this.REST_API_SERVER, auction)
      .pipe(
        //catchError(this.handleError('add auction', auction))
        catchError(this.handleError)
      );
  }

  comment(auction: Auction): Observable<Auction> {
    return this.httpClient.post<Auction>(this.REST_API_SERVER, auction)
      .pipe(
        catchError(this.handleError)
      );
  }
  bid(auction: Auction): Observable<Auction> {
    return this.httpClient.post<Auction>(this.REST_API_SERVER, auction)
      .pipe(
        catchError(this.handleError)
      );
  }
  rate(auction: Auction): Observable<Auction> {
    return this.httpClient.post<Auction>(this.REST_API_SERVER, auction)
      .pipe(
        catchError(this.handleError)
      );
  }

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
