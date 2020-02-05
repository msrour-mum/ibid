import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comments';
import { DataService } from 'src/app/services/data.service';
import { Observable, merge, of} from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  auctionId : string;
  comments: Observable<Comment[]>;

  constructor(private commentsService: CommentsService,
    private dataService: DataService) { 

      this.dataService.auctionIdEmitter
      .subscribe(id => {
        this.auctionId = id;
      
        this.comments  = this.commentsService.listComments(this.auctionId)
        .pipe(map(commentList => commentList.sort(this.compareFn)));

        this.comments.subscribe((comments:Comment[]) => {
          this.commentsService.newCommentEmitter.emit({value:comments.length});
        });
      });
  
      // this.dataService.commentsEmitter
      // .subscribe(comments => this.comments = comments);

      this.commentsService.newCommentEmitter
      .subscribe(newComment=> {
       
       let commentsList : Comment[] = [];
       commentsList.push(newComment);
       this.comments = merge(this.comments, of(commentsList))
       .pipe(map(commentList => commentList.sort(this.compareFn)));
       
      });
    }

  ngOnInit() { 
  }
 
   compareFn (comment1:Comment, comment2:Comment) {
    if (comment1.creation_date > comment2.creation_date)
      return -1;
    if (comment1.creation_date < comment2.creation_date)
      return 1;
    return 0;
  }

}
