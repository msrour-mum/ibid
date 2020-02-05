import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';

import {PreloadAllModules, RouterModule} from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppConfig} from './config/app.config';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuctionsModule} from './auctions/auctions.module';


import {LoginComponent} from './authentication/login/login.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './authentication/services/authentication.service';

import {JwtInterceptor} from './app-common/interceptors/jwt.interceptor';
import {AuthGuard} from './app-common/guards/authGaurd';
import {AuctionItemComponent} from './auctions/auction/auction-item/auction-item.component';
import {AuctionListComponent} from './auctions/auction/auction-list/auction-list.component';
import {AuctionAddComponent} from './auctions/auction/auction-add/auction-add.component';
import {AuctionHomeComponent} from './auctions/auction/auction-home/auction-home.component';
import {UserAuctionsComponent} from './users/user-auctions/user-auctions.component';
import {AuctionUserComponent} from './auctions/auction/auction-user/auction-user.component';
import {UsersModule} from './users/users.module';
import {AppCommonModule} from './app-common/app-common.module';
import {AuctionSearchComponent} from './auctions/auction/auction-search/auction-search.component';


export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

const routes = [
  {path: '', redirectTo: 'home',pathMatch: 'full', canActivate: [AuthGuard] },
  {path: 'home', component: AuctionHomeComponent, canActivate: [AuthGuard]  },
  {path: 'auctions/:auctionId', component: AuctionItemComponent , canActivate: [AuthGuard] },
  {path: 'user/:id/auctions', component: UserAuctionsComponent , canActivate: [AuthGuard] },
  {path: 'auctions', component: AuctionAddComponent, canActivate: [AuthGuard]  },
  {path: 'search', component: AuctionSearchComponent, canActivate: [AuthGuard]  },
  {path: 'profile', component: AuctionHomeComponent, canActivate: [AuthGuard]  },
  {path: 'login', component: LoginComponent  },
  {path: 'signup', component: SignupComponent},
  {path: '**', redirectTo: '/home', canActivate: [AuthGuard]} ];

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
    UsersModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    ReactiveFormsModule,
    AppCommonModule
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
