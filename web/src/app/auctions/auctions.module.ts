import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { BidComponent } from './bid/bid.component';
import { CommentsComponent } from './comments/comments.component';
import { RatingComponent } from './rating/rating.component';



@NgModule({
  declarations: [CreateComponent, ViewComponent, ListComponent, BidComponent, CommentsComponent, RatingComponent],
  imports: [
    CommonModule
  ]
})
export class AuctionsModule { }
