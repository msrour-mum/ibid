import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {SubSink} from "subsink";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  private signupForm : FormGroup =  this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required]
      }),
      phone: [''],
      photoUrl: ['']
    });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService : AuthenticationService) {

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
    return this.signupForm.get(controlName).errors &&
      this.signupForm.get(controlName).errors[validationType] &&
      this.signupForm.get(controlName).touched;
  }
  isValid(controlName) {
    return this.signupForm.get(controlName).invalid &&
           this.signupForm.get(controlName).touched;
  }

  onSubmit(): void {

    console.log(this.signupForm.invalid);
    console.dir(this.signupForm.errors);

    this.subs.add(this.authService.register(this.signupForm.value)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      ));

 };

}
