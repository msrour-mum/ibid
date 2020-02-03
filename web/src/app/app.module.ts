import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {PreloadAllModules, RouterModule} from "@angular/router";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppConfig} from './config/app.config';
import {AuctionsModule} from './auctions/auctions.module';
import {ListComponent} from "./auctions/list/list.component";
import {CreateComponent} from './auctions/create/create.component';
import {BidComponent} from './auctions/bid/bid.component';


export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

const routes = [
  {path: '', component: ListComponent,pathMatch: 'full' },
  {path: 'home', component: ListComponent  },
  {path: 'auctions/:auctionId', component: BidComponent  },
  {path: 'auctions', component: CreateComponent  },
  {path: 'profile', component: ListComponent  },
  //{path: 'new', component: ListComponent, pathMatch: 'full' },
  //{path: 'users/:id/auctions/:auctionId', component: ListComponent, pathMatch: 'full'},//ToDo: add new component
  //{path:'auctions', loadChildren: ()=> import('./auctions/auctions.module').then(m=> m.AuctionsModule)},
  {path: '**', redirectTo:'home' }];

@NgModule({
  declarations: [
    AppComponent
  ],   
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule ,
    AuctionsModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [AppConfig,
    { provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true }
      ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
