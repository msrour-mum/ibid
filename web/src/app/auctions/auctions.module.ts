import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { BidComponent } from './bid/bid.component';
import { CommentsComponent } from './comments/comments.component';
import { RatingComponent } from './rating/rating.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [CreateComponent, ViewComponent, ListComponent, BidComponent, CommentsComponent, RatingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ] ,
  exports:[
    CreateComponent, ViewComponent, ListComponent, BidComponent, CommentsComponent, RatingComponent
  ]
})
export class AuctionsModule { }
