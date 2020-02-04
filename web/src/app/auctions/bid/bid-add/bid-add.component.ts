import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuctionsApiService} from '../../auctions-api.service';
import {EmitterService} from '../../../util/emitter.service';
import {Subject} from 'rxjs';
import {Auction} from '../../auction';

@Component({
  selector: 'app-bid-add',
  templateUrl: './bid-add.component.html',
  styleUrls: ['./bid-add.component.css']
})
export class BidAddComponent implements OnInit {
  frmBid: FormGroup;
  id: object;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private item: Auction;
  lblBidMsg: string;

  constructor(private activeRounter: ActivatedRoute, private dataService: AuctionsApiService, private  fb: FormBuilder, private emitterService: EmitterService) {
    activeRounter.params.subscribe(p => {
      this.id = p.auctionId;
    });

    this.frmBid = fb.group(
      {
        bid: ['', Validators.required]
      });
  }

  ngOnInit() {
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

}
