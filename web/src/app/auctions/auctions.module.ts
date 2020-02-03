import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { BidComponent } from './bid/bid.component';
import { CommentsComponent } from './comments/comments.component';
import { RatingComponent } from './rating/rating.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
//import {MomentModule} from '../utility/pipes/date';
import {UtilModule} from '../util/util.module';
import { CommentsModule } from './comments/comments.module';


const routes = [
  {path: ':auctionId', component: ViewComponent, pathMatch: 'full' },
  {path: '', component: CreateComponent, pathMatch: 'full' }
  ];


@NgModule({
  declarations: [CreateComponent, ViewComponent, ListComponent, BidComponent, RatingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommentsModule,
    UtilModule

  ],
  exports:[
    CreateComponent, ViewComponent, ListComponent, BidComponent, RatingComponent
  ]
})
export class AuctionsModule { }
