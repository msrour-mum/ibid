import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Auction} from '../../../models/auction';
import {AuctionsApiService} from '../../auctions-api.service';

@Component({
  selector: 'app-auction-home',
  templateUrl: './auction-home.component.html',
  styleUrls: ['./auction-home.component.css']
})
export class AuctionHomeComponent implements OnInit {

  lstAuctions: Observable<Auction[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: AuctionsApiService) {
  }

  ngOnInit() {
    this.lstAuctions = this.dataService.list();

  }

}
