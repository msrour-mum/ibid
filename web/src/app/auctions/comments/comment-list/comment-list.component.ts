import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comments';
import { DataService } from 'src/app/services/data.service';
import { Observable, merge, of, throwError} from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  auctionId : string;
  result: Observable<any>;
  comments: Observable<Comment[]>;

  resultScroll: Observable<any>;
  commentsScroll: Observable<Comment[]>;
  commentListCount: number = 0;

  page = 1;
  limit= 10;

  constructor(private commentsService: CommentsService,
    private dataService: DataService) { 

      this.dataService.auctionIdEmitter
      .subscribe(id => {
        this.auctionId = id;
        
      
        this.result  = this.commentsService.listComments(this.auctionId,this.limit,this.page);
        this.comments = this.result.pipe(map(data => data.result), map( data => data.sort(this.compareFn)));

        this.result.subscribe((data) => {
          this.commentListCount = data['totalCount'];
          this.commentsService.newCommentEmitter.emit({value:this.commentListCount});
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
 
  onScroll() {
  
  
    this.resultScroll  = this.commentsService.listComments(this.auctionId, this.limit * this.page , this.page + 1);
    this.page += 1;

    this.comments = this.resultScroll.pipe(map(data => data.result), map( data => data.sort(this.compareFn)));
  }

   
  


   compareFn (comment1:Comment, comment2:Comment) {
    if (comment1.creation_date > comment2.creation_date)
      return -1;
    if (comment1.creation_date < comment2.creation_date)
      return 1;
    return 0;
  }

}
