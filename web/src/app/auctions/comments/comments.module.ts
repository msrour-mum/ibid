import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TimeAgoPipe} from 'time-ago-pipe';

import { CommentItemComponent } from './comment-item/comment-item.component';
import { CommentAddComponent } from './comment-add/comment-add.component';
import { CommentsComponent } from './comments.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import {ResultsLabelPipe} from '../../pipes/results-label.pipe';


@NgModule({
  declarations: [
    TimeAgoPipe,
    ResultsLabelPipe,
    CommentsComponent, 
    CommentItemComponent, 
    CommentAddComponent,
    CommentListComponent],
  imports: [
    CommonModule
  ],
  exports:[
    TimeAgoPipe,
    ResultsLabelPipe,
    CommentsComponent, 
    CommentItemComponent, 
    CommentAddComponent,
    CommentListComponent]
})
export class CommentsModule { }
