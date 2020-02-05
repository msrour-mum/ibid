import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuctionsApiService} from '../auctions-api.service';
import {EmitterService} from '../../util/emitter.service';
import {AuthenticationService} from '../../authentication/services/authentication.service';
import {Auction} from '../auction';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() auction: Auction;
  frmLike: FormGroup;
  frmDislike: FormGroup;
  constructor( private dataService: AuctionsApiService, private  fb: FormBuilder,
              private emitterService: EmitterService, private authService: AuthenticationService) {
    this.frmLike = fb.group({});
    this.frmDislike = fb.group({});
  }

  ngOnInit() {
     this.emitterService.emitter.subscribe(data => this.auction = data);
    this.auction.count_like =this.auction.count_like | 0;
    this.auction.count_dislike =this.auction.count_dislike | 0;
    // this.emitterService.emitValue(data);
  }

  OnLike() {
    this.saveLike(true);

  }

  OnDislike() {
    this.saveLike(false);
  }

  saveLike(islike: boolean) {
    let user = this.authService.currentUser;
    let likeItem = {user: user, is_like: islike};
    this.dataService.like(this.auction._id, likeItem).subscribe(resp => {
      //console.log('add auction : ', resp);
    });
    this.loadOneAuction();
  }
  loadOneAuction() {
    this.dataService.loadOne(this.auction._id).subscribe((data: any) => {
      this.auction = data;
      this.auction.count_like =this.auction.count_like | 0;
      this.auction.count_dislike =this.auction.count_dislike | 0;
      // this.emitterService.emitValue(data);
    });
  }

}
