import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RatingComponent} from './rating/rating.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {UtilModule} from '../util/util.module';

import {AuctionItemComponent} from './auction/auction-item/auction-item.component';
import {AuctionListComponent} from './auction/auction-list/auction-list.component';
import {AuctionAddComponent} from './auction/auction-add/auction-add.component';
import {CommentAddComponent} from './comments/comment-add/comment-add.component';
import {CommentItemComponent} from './comments/comment-item/comment-item.component';
import {CommentListComponent} from './comments/comment-list/comment-list.component';
import {CommentsComponent} from './comments/comments.component';
import {ResultsLabelPipe} from '../pipes/results-label.pipe';
import { BidListComponent } from './bid/bid-list/bid-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes = [
  {path: ':auctionId', component: AuctionItemComponent, pathMatch: 'full'},
  {path: '', component: AuctionAddComponent, pathMatch: 'full'}
];


@NgModule({
  declarations: [ RatingComponent, BidListComponent, AuctionItemComponent, AuctionListComponent, AuctionAddComponent ,
    CommentAddComponent, CommentItemComponent, CommentListComponent, CommentsComponent, ResultsLabelPipe, BidListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UtilModule,
    InfiniteScrollModule

  ],
  exports: [
     RatingComponent, BidListComponent, AuctionItemComponent, AuctionListComponent, AuctionAddComponent,
    CommentAddComponent, CommentItemComponent, CommentListComponent, CommentsComponent
  ]
})
export class AuctionsModule {
}
