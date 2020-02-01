import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppConfig} from './config/app.config';
import { APP_INITIALIZER } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CreateComponent} from './auctions/create/create.component';
import {AuctionsModule} from './auctions/auctions.module';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}
@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule ,
    AuctionsModule
  ],
  providers: [AppConfig,
    { provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true }
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
