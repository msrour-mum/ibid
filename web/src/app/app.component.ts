import { Component } from '@angular/core';
import {AuthenticationService} from "./users/services/authentication.service";

@Component({
  selector: 'app-root',
 templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';
  constructor(private authService: AuthenticationService) {
    console.log('Hi there ');

    //Test call config
    //console.log(AppConfig.settings.node_port);

  }
}
