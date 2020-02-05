import { Injectable, EventEmitter } from '@angular/core';
import { Comment } from '../../models/comments';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public auctionIdEmitter = new EventEmitter<string>();
  public commentsEmitter = new EventEmitter<Comment[]>();

  constructor() { }



}
