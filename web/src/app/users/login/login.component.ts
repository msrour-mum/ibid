import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {SubSink} from "subsink";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  private loginFailed: boolean;
  private message: string;
  private loginForm : FormGroup =  this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private fb: FormBuilder,
              private authService : AuthenticationService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  hasError(controlName, validationType) {
    return this.loginForm.get(controlName).errors &&
      this.loginForm.get(controlName).errors[validationType] &&
      this.loginForm.get(controlName).touched;
  }
  isValid(controlName) {
    return this.loginForm.get(controlName).invalid &&
      this.loginForm.get(controlName).touched;
  }

  onSubmit(): void {
    this.subs.add(this.authService.login(this.loginForm.value)
      .subscribe((result: any) => {
        console.log(result.error);
          if(result.error) { return this.failedLoginHandler(result.error.message);}
          console.dir('result' + result);
        },
        result => this.failedLoginHandler(result.error.error.message)
      ));
  };

  failedLoginHandler(message):void {
    console.log('fail');
    this.loginFailed = true;
    this.message = message;
  }
}
