import {Component, OnInit} from '@angular/core';
import {Auction} from '../auction';
import {EmitterService} from '../../util/emitter.service';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  private auction: Auction;

  constructor(private emitterService: EmitterService) {
  }

  ngOnInit() {
    this.emitterService.emitter.subscribe(data => this.auction = data);
  }
}
