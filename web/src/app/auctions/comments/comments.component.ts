import {Component, Input, OnInit, Output} from '@angular/core';
import {CommentsService} from 'src/app/app-common/services/comments.service';
import {DataService} from 'src/app/app-common/services/data.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() auctionId: string;
  @Output() commentCount: number = 0;
  @Input() comments;


  constructor(private commentsService: CommentsService,
              private dataService: DataService) {

    this.commentsService.newCommentEmitter
      .subscribe((data: number) => this.commentCount += data['value']);
  }

  ngOnInit() {
    this.dataService.auctionIdEmitter.emit(this.auctionId);
    this.dataService.commentsEmitter.emit(this.comments);

  }


}
