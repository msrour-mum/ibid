import {Component, Input, OnInit, Output} from '@angular/core';
import {CommentsService} from 'src/app/services/comments.service';
import {DataService} from 'src/app/services/data.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() auctionId: string;
  commentCount = 0;
  @Input() comments;


  constructor(private commentsService: CommentsService,
              private dataService: DataService) {

    this.commentsService.newCommentEmitter
      .subscribe((data) => this.commentCount += data['value']);
  }

  ngOnInit() {

    //publish auction id & comments to subscribers
    this.dataService.auctionIdEmitter.emit(this.auctionId);
    this.dataService.commentsEmitter.emit(this.comments);
  

  }


}
