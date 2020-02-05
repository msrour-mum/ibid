import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuctionsApiService} from '../../auctions-api.service';
import {EmitterService} from '../../../util/emitter.service';
import {Subject} from 'rxjs';
import {Auction} from '../../auction';
import {AuthenticationService} from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-bid-add',
  templateUrl: './bid-add.component.html',
  styleUrls: ['./bid-add.component.css']
})
export class BidAddComponent implements OnInit {
  frmBid: FormGroup;
  auctionId: object;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private auction: Auction;
  lblBidMsg: string;

  constructor(private activeRouter: ActivatedRoute, private dataService: AuctionsApiService, private  fb: FormBuilder,
              private emitterService: EmitterService ,private authService: AuthenticationService) {
    activeRouter.params.subscribe(p => {
      this.auctionId = p.auctionId;
    });

    this.frmBid = fb.group(
      {
        bid: ['', Validators.required]
      });
  }

  ngOnInit() {
  }

  loadOneAuction() {
    this.dataService.loadOne(this.auctionId).subscribe((data: any) => {
      this.auction = data;
      this.emitterService.emitValue(data);
    });
  }

  OnBid() {

    let user = this.authService.currentUser;
    let price = this.frmBid.value.bid;
    let bidItem = {user: user, creation_date: new Date(), price: price};
    this.dataService.bid(this.auctionId, bidItem).subscribe(resp => {
      console.log('add auction : ', resp);
    });
    this.loadOneAuction();
    this.frmBid.controls['bid'].setValue(0);
    this.lblBidMsg = 'Bid added sucessfly , current auction price is : ' + price;
  }

}
