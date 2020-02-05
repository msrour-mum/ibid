import {Component, Output} from '@angular/core';
import {AuthenticationService} from "./authentication/services/authentication.service";
import {AppConfig} from "./config/app.config";

@Component({
  selector: 'app-root',
 templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';
  @Output() hostUrl;
  constructor(private authService: AuthenticationService) {

    this.hostUrl = AppConfig.settings.apiServiceUrl;
    console.log('Hi there ');

    //Test call config
    //console.log(AppConfig.settings.node_port);

  }
}
