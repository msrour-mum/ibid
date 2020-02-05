import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { CommentsService } from 'src/app/app-common/services/comments.service';
import {Comment} from 'src/app/models/comments';
import { DataService } from 'src/app/app-common/services/data.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';


@Component({
  selector: 'comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent implements OnInit {

  add_comment_form: FormGroup;
  auctionId : string;

  constructor(fb: FormBuilder,
    private commentsService: CommentsService,
    private dataService: DataService,
    private authService: AuthenticationService) {

    this.add_comment_form = fb.group({
      'comment_text': [null, Validators.required]
    });

    this.dataService.auctionIdEmitter
      .subscribe(id => this.auctionId = id);
  }

  ngOnInit() {
  }

  submitForm() {
    this.markFormTouched(this.add_comment_form);
    if (this.add_comment_form.valid) {
      this.addComment();
    } 
  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  }

  addComment(){
    var comment = new Comment();
    comment.user = this.authService.currentUser;
    comment.comment_text = this.add_comment_form
                               .controls['comment_text']
                               .value;           
    comment.creation_date = new Date();

    this.commentsService.save(this.auctionId, comment)
    .toPromise()
    .then(()=> this.commentsService
                   .newCommentEmitter
                   .emit({value:1,comment}));
               
    this.add_comment_form.reset();
  }

  

}
