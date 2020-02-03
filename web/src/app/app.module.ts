import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppConfig} from './config/app.config';
import { APP_INITIALIZER } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuctionsModule} from './auctions/auctions.module';
import {ListComponent} from "./auctions/list/list.component";
import {PreloadAllModules, RouterModule} from "@angular/router";
import {CreateComponent} from './auctions/create/create.component';
import {BidComponent} from './auctions/bid/bid.component';
import {LoginComponent} from "./users/login/login.component";
import {SignupComponent} from "./users/signup/signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "./users/services/authentication.service";
import {JwtInterceptor} from "./util/jwt.interceptor";

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

const routes = [
  {path: '', component: ListComponent,pathMatch: 'full' },
  {path: 'home', component: ListComponent  },
  {path: 'auctions/:auctionId', component: BidComponent  },
  {path: 'auctions', component: CreateComponent  },
  {path: 'profile', component: ListComponent  },
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,deps: [AppConfig], multi: true },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor()
  {

  }
}
