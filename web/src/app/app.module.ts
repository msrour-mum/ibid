import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';

import {PreloadAllModules, RouterModule} from "@angular/router";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppConfig} from './config/app.config';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuctionsModule} from './auctions/auctions.module';

import {BidComponent} from './auctions/bid/bid.component';
import {LoginComponent} from "./authentication/login/login.component";
import {SignupComponent} from "./authentication/signup/signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "./authentication/services/authentication.service";

import {JwtInterceptor} from "./util/jwt.interceptor";
import {AuctionItemComponent} from './auctions/auction/auction-item/auction-item.component';
import {AuctionListComponent} from './auctions/auction/auction-list/auction-list.component';
import {AuctionAddComponent} from './auctions/auction/auction-add/auction-add.component';


export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

const routes = [
  {path: '', component: AuctionListComponent,pathMatch: 'full' },
  {path: 'home', component: AuctionListComponent  },
  {path: 'auctions/:auctionId', component: AuctionItemComponent  },
  {path: 'auctions', component: AuctionAddComponent  },
  {path: 'profile', component: AuctionListComponent  },
  {path: 'login', component: LoginComponent  },
  {path: 'signup', component: SignupComponent},
  //{path: 'new', component: ListComponent, pathMatch: 'full' },
  //{path: 'users/:id/auctions/:auctionId', component: ListComponent, pathMatch: 'full'},//ToDo: add new component
  //{path:'auctions', loadChildren: ()=> import('./auctions/auctions.module').then(m=> m.AuctionsModule)},
  {path: '**', redirectTo:'home' }];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuctionsModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    ReactiveFormsModule
  ],
  providers: [AppConfig,
    { provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    },
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
