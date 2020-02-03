import {Auction} from '../auction';
import {EmitterService} from '../../util/emitter.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  private auction: Auction;

  constructor(private emitterService: EmitterService) {
  }
  @Output() auctionId="5e376eddb7958812d82a765a";
  @Output() comments = null;

  ngOnInit() {
    this.emitterService.emitter.subscribe(data => this.auction = data);
  }
}
