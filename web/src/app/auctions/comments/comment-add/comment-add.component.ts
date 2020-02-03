import { Component, OnInit, Input } from '@angular/core';

import { CommentsService } from 'src/app/services/comments.service';
import {Comment} from 'src/app/models/comments';
import { DataService } from 'src/app/services/data.service';
 

@Component({
  selector: 'comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent implements OnInit {

  auctionId : string;
 
  constructor(private commentsService: CommentsService,
    private dataService: DataService) { 

      this.dataService.auctionIdEmitter
      .subscribe(id => this.auctionId = id);
    }
   
  ngOnInit() {
   
  }

  addComment(comment_text:string){
    var user = {name:'Adi', 
    email:'a.abuhazeem@gmail.com',
    photoUrl:'http://lorempixel.com/40/40/people/1/'};

    var comment = new Comment();
    comment.user = user;
    comment.comment_text = comment_text;
    comment.creation_date = new Date();
    
   
    this.commentsService.save(this.auctionId, comment)
    .toPromise()
    .then(()=> this.commentsService
                   .newCommentEmitter
                   .emit({value:1,comment}));
  }

}
