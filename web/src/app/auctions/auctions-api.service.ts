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

    // tslint:disable-next-line:no-unused-expression
    //this.REST_API_SERVER = 'http://localhost:4000/auctions';
    this.REST_API_SERVER = AppConfig.settings.apiServiceUrl+'auctions';
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


  public sendGetRequest() {
    //return this.httpClient.get(this.REST_API_SERVER);
    const options = {params: new HttpParams({fromString: '_page=1&_limit=30'})};
    //return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));  }
    //return this.httpClient.get(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));}

    return this.httpClient.get<Auction[]>(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));
  }


  Add(auction: Auction): Observable<Auction> {
    return this.httpClient.post<Auction>(this.REST_API_SERVER, auction)
      .pipe(
        //catchError(this.handleError('add auction', auction))
        catchError(this.handleError)
      );
  }

}
