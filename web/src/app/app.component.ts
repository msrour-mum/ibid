import { Component } from '@angular/core';
import {AppConfig} from './config/app.config';

@Component({
  selector: 'app-root',
 // templateUrl: './app.component.html',
  template:`  <app-create></app-create>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';
 // protected apiServer = AppConfig.settings.apiServer;
  constructor() {
    console.log('Hi there ');

    //Test call config
    //console.log(AppConfig.settings.node_port);

  }
}
