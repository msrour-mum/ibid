import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../../config/app.config";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authentication: Observable<any>;

  private authenticationSubject: BehaviorSubject<any>;
  private jwtHelperService: JwtHelperService;
  private AUTH_STORAGE_NAME: string = '_AUTH';

  constructor(private http: HttpClient,
              private router: Router) {

    this.authenticationSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(this.AUTH_STORAGE_NAME)));
    this.authentication = this.authenticationSubject.asObservable();
    this.jwtHelperService =new JwtHelperService();
  }

  public get currentUser(): any {
    return this.authenticationSubject.value ? this.authenticationSubject.value.user : null;
  }

  public get authToken(): any {
    return this.authenticationSubject.value ? this.authenticationSubject.value.token : '';
  }

  public get isAuthenticated(): boolean {
   return !this.jwtHelperService.isTokenExpired(this.authToken);
  }

  register(body:any) {
    return this.http.post(`${AppConfig.settings.apiServiceUrl}auth/signup`,
      body,{ observe:'body' });
  }

  login(body:any) {
    return this.http.post<any>(`${AppConfig.settings.apiServiceUrl}auth/login`, body)
      .pipe(map(result => {
        if(result.data && !result.error) {
          localStorage.setItem(this.AUTH_STORAGE_NAME, JSON.stringify(result.data));
        }
        this.authenticationSubject.next(result.data);
        return result;
      }));
  }

  logout() {
    localStorage.removeItem(this.AUTH_STORAGE_NAME);
    this.authenticationSubject.next(null);
    this.router.navigate(['login']);
  }
}
