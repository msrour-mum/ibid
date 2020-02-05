import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
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
    const options = {params: new HttpParams({fromString: '_page=0&_limit=30'})};
    return this.httpClient.get<Auction[]>(this.REST_API_SERVER, options).pipe(
      map((result: any) => result.data),
      map(data => data.filter(d => d.status == 'Initiated')),
      retry(3), catchError(this.handleError));
  }

  public listUserAuctions(userEmail: string) {
    const options = {params: new HttpParams({fromString: '_page=0&_limit=30'})};
    return this.httpClient.get<Auction[]>(this.REST_API_SERVER + '/users/' + userEmail + '/auctions', options).pipe(
      map((result: any) => result.data),
      //map(data => data.filter(d => d.user.email == userEmail)),
      retry(3), catchError(this.handleError));
  }

  public loadOne(auctionId: any) {
    const options = {params: new HttpParams({fromString: '_page=0&_limit=30'})};
    console.log(this.REST_API_SERVER + '/' + auctionId);
    return this.httpClient.get<Auction[]>(this.REST_API_SERVER + '/' + auctionId, options).pipe(
      map((result: any) => result.data),
      retry(3), catchError(this.handleError));
  }

  public search(query) {
    const options = {params: new HttpParams({fromString: '_page=0&_limit=30'})};
    return this.httpClient.get<Auction[]>(this.REST_API_SERVER, options).pipe(
      map((result: any) => result.data),
      retry(3), catchError(this.handleError));
  }

  public listComment(id) {
    const options = {params: new HttpParams({fromString: '_page=0&_limit=30'})};
    return this.httpClient.get<Auction[]>(this.REST_API_SERVER, options).pipe(
      map((result: any) => result.data),
      retry(3), catchError(this.handleError));
  }

  public listbids(id) {
    const options = {params: new HttpParams({fromString: '_page=0&_limit=30'})};
    return this.httpClient.get<Auction[]>(this.REST_API_SERVER, options).pipe(
      map((result: any) => result.data),
      retry(3), catchError(this.handleError));
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

  bid(auctionId: any, bidItem: any): Observable<Auction> {
    console.log('u : ', this.REST_API_SERVER + '/' + auctionId + '/bids');
    return this.httpClient.post<Auction>(this.REST_API_SERVER + '/' + auctionId + '/bids', bidItem)
      .pipe(
        catchError(this.handleError)
      );
  }

  like(auctionId: any, bidItem: any): Observable<Auction> {
    return this.httpClient.post<Auction>(this.REST_API_SERVER + '/' + auctionId + '/likes', bidItem)
      .pipe(
        catchError(this.handleError)
      );
  }

  dislike(auctionId: any, bidItem: any): Observable<Auction> {
    console.log('u : ', this.REST_API_SERVER + '/' + auctionId + '/bids');
    return this.httpClient.post<Auction>(this.REST_API_SERVER + '/' + auctionId + '/bids', bidItem)
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
