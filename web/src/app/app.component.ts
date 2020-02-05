import {Component, Output} from '@angular/core';
import {AuthenticationService} from "./authentication/services/authentication.service";
import {AppConfig} from "./config/app.config";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppValidator} from './app-common/validators/app-validator';

@Component({
  selector: 'app-root',
 templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';
  @Output() hostUrl;
  searchForm: FormGroup = this.fb.group(
    {
      search: ['']
    });
  constructor(private authService: AuthenticationService,
              private  fb: FormBuilder) {

    this.hostUrl = AppConfig.settings.apiServiceUrl;
    console.log('Hi there ');

    //Test call config
    //console.log(AppConfig.settings.node_port);

  }
}
