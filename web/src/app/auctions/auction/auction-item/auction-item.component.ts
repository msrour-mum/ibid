import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Auction} from '../../auction';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuctionsApiService} from '../../auctions-api.service';
import {EmitterService} from '../../../util/emitter.service';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {AppConfig} from "../../../config/app.config";

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css']
})
export class AuctionItemComponent implements OnInit {

  auctionId: object;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private auction: Auction;
  private hostUrl: string;
  frmBid: FormGroup;
  frmLike: FormGroup;
  frmDislike: FormGroup;
  validateMsgType: string;
  validateMsg: string;
  successMsg :string;

  constructor(private activeRouter: ActivatedRoute, private dataService: AuctionsApiService, private  fb: FormBuilder,
              private emitterService: EmitterService, private authService: AuthenticationService) {
    activeRouter.params.subscribe(p => {
      this.auctionId = p.auctionId;
    });

    this.frmBid = fb.group(
      {
        bid: ['', Validators.required]
      });
    this.frmLike = fb.group({});
    this.frmDislike = fb.group({});

  }

  ngOnInit() {
    this.hostUrl = AppConfig.settings.apiServiceUrl;
    this.loadOneAuction();

  }

  loadOneAuction() {
    this.dataService.loadOne(this.auctionId).subscribe((data: any) => {
      this.auction = data;
      this.emitterService.emitValue(data);
    });
  }

  OnBid() {

    this.validateMsgType = this.validateMsg = null;
    if (!this.frmBid.valid) {
      return;
    }

    if (parseFloat(this.frmBid.value.bid) < 0) {
      this.validateMsg = 'bid price could not be negative number';
      this.validateMsgType='warning';
      return;
    }
    if (parseFloat(this.frmBid.value.bid) < this.auction.bid_price) {
      this.validateMsg = 'Your price could not be less than current bid price';
      this.validateMsgType='warning';
      return;
    }


    let user = this.authService.currentUser;
    let price = this.frmBid.value.bid;
    let bidItem = {user: user, creation_date: new Date(), price: price};
    this.dataService.bid(this.auctionId, bidItem).subscribe(resp => {
      // console.log('add auction : ', resp);
    });
    this.loadOneAuction();
    //this.frmBid.controls['bid'].setValue(0);
   // this.frmBid.controls['bid'].

    //this.frmBid.disabled=false;
    this.validateMsgType='success';
    this.successMsg = 'current item price is : ' + price;
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
    this.dataService.like(this.auctionId, likeItem).subscribe(resp => {
      //console.log('add auction : ', resp);
    });
    this.loadOneAuction();
  }


  hasError(controlName, validationType) {
    return this.frmBid.get(controlName).errors &&
      this.frmBid.get(controlName).errors[validationType] &&
      this.frmBid.get(controlName).touched;
  }

  isValid(controlName) {
    return this.frmBid.get(controlName).invalid &&
      this.frmBid.get(controlName).touched;
  }

}
