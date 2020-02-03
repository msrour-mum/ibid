import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../../config/app.config";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  register(body:any) {

    return this.http.post(AppConfig.settings.apiServiceUrl + 'auth/signup', body,{
      observe:'body'
    });
  }

  login(body:any) {

    return this.http.post(AppConfig.settings.apiServiceUrl + 'auth/login', body,{
      observe:'body'
    });
  }
}
