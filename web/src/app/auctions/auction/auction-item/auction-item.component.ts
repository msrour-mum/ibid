import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Auction} from '../../auction';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuctionsApiService} from '../../auctions-api.service';
import {EmitterService} from '../../../util/emitter.service';

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css']
})
export class AuctionItemComponent implements OnInit {
  id: object;

  destroy$: Subject<boolean> = new Subject<boolean>();
  private item: Auction;
  frmBid: FormGroup;
  frmLike: FormGroup;
  frmDislike: FormGroup;
  lblBidMsg: string;

  constructor(private activeRounter: ActivatedRoute, private dataService: AuctionsApiService, private  fb: FormBuilder, private emitterService: EmitterService) {
    activeRounter.params.subscribe(p => {
      this.id = p.auctionId;
    });

    this.frmBid = fb.group(
      {
        bid: ['', Validators.required]
      });
    this.frmLike = fb.group({});
    this.frmDislike = fb.group({});

  }

  ngOnInit() {
    this.loadOneAuction();

  }

  loadOneAuction() {
    this.dataService.loadOne(this.id).subscribe((x: any) => {
      this.item = x;
      console.log('x', x);
      this.emitterService.emitValue(x);
    });
  }

  OnBid() {

    let user = {name: 'Mohame Salah', email: 'mossalah@mum.ed'};
    let price = this.frmBid.value.bid;
    let bidItem = {user: user, creation_date: new Date(), price: price};
    this.dataService.bid(this.id, bidItem).subscribe(resp => {
      console.log('add auction : ', resp);
    });
    this.loadOneAuction();
    this.frmBid.controls['bid'].setValue(0);
    this.lblBidMsg = 'Bid added sucessfly , current item price is : ' + price;
  }

  OnLike() {
    this.saveLike(true);
  }

  OnDislike() {
    this.saveLike(false);
  }

  saveLike(islike: boolean) {
    let user = {name: 'Mohame Salah', email: 'mossalah@mum.ed'};
    let likeItem = {user: user, is_like: islike};
    this.dataService.like(this.id, likeItem).subscribe(resp => {
      console.log('add auction : ', resp);
    });
    this.loadOneAuction();
  }
}
