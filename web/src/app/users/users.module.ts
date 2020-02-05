import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../authentication/login/login.component';
import { SignupComponent } from '../authentication/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import { UserAuctionsComponent } from './user-auctions/user-auctions.component';
import {AuctionsModule} from '../auctions/auctions.module';

@NgModule({
  declarations: [ProfileComponent, UserAuctionsComponent],
  exports: [ProfileComponent, UserAuctionsComponent],

  imports: [
    CommonModule , AuctionsModule
  ]
})
export class UsersModule { }
