import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubSink} from "subsink";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthenticationService} from '../services/authentication.service';

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
              private router: Router,
              private authService: AuthenticationService) {

    if (this.authService.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

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
      .pipe(first())
      .subscribe((result: any) => {
          if (result.error) {
            return this.failedLoginHandler(result.error.message);
          } else {
            return this.router.navigate(['home']);
          }
        },
        result => this.failedLoginHandler(result.error.error.message)
      ));
  };

  failedLoginHandler(message):void {
    this.loginFailed = true;
    this.message = message;
  }
}
