import {Component, OnInit} from '@angular/core';
import {Auction} from '../../auction';
import {EmitterService} from '../../../util/emitter.service';

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.css']
})
export class BidListComponent implements OnInit {
  private auction: Auction;
  constructor(private emitterService: EmitterService) {
  }
  ngOnInit() {
    this.emitterService.emitter.subscribe(data => this.auction = data);
  }
}
