import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Auction} from '../auction';
import {ActivatedRoute} from '@angular/router';
import {AuctionsApiService} from '../auctions-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppValidator} from '../../app-validator';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  id: object;
 // item: Observable<Auction[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private item: Auction;
  frmBid: FormGroup;
  frmLike: FormGroup;
  frmDislike: FormGroup;
  constructor(private activeRounter: ActivatedRoute, private dataService: AuctionsApiService, private  fb: FormBuilder) {
    activeRounter.params.subscribe(p => {
      this.id = p.auctionId;
    });

    this.frmBid = fb.group(
      {
        bid: ['', Validators.required]
      });
    this.frmLike = fb.group(      {      });
    this.frmDislike = fb.group(      {      });

  }
  ngOnInit() {
    console.log('this.id' , this.id);
    this.dataService.loadOne(this.id).subscribe((x: any) => this.item = x);
     //console.log('this' ,this.auction);
  }

  OnBid() {
    console.log('OnBid')
  }
  OnLike() {
    console.log('OnLike')
  }
  OnDislike() {
    console.log('OnDislike')
  }
}
