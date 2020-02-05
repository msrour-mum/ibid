import {Component, OnInit} from '@angular/core';
import {CommentsService} from 'src/app/app-common/services/comments.service';
import {Comment} from 'src/app/models/comments';
import {DataService} from 'src/app/app-common/services/data.service';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  auctionId: string;
  comments: Comment[] = [];

  constructor(private commentsService: CommentsService,
              private dataService: DataService) {

    this.dataService.auctionIdEmitter
      .subscribe(id => this.auctionId = id);

    this.dataService.commentsEmitter
      .subscribe(comments => this.comments = comments);

    this.commentsService.newCommentEmitter
      .subscribe(data => {
        console.log(data.comment);
        if (!this.comments) {
          this.comments = [];
        }

        this.comments.unshift(data.comment);
        this.comments = this.comments.slice();
      });
  }

  ngOnInit() {


  }

  AfterViewInit() {
    if (!this.comments) {
      //this.comments = this.commentsService.listComments(this.auctionId);
    }
  }


}
