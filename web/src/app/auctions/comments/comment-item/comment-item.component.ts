import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comments';
import {AppConfig} from '../../../config/app.config';

@Component({
  selector: 'comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() auctionId : string;
  @Input() comment: Comment;
  private hostUrl: string;

  constructor() { }

  ngOnInit() {
    this.hostUrl = AppConfig.settings.apiServiceUrl;
  }

}
