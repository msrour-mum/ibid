import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Auction} from '../../auction';
import {AuctionsApiService} from '../../auctions-api.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  lstAuctions: Observable<Auction[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: AuctionsApiService) {
  }

  ngOnInit() {
    this.lstAuctions = this.dataService.list();

  }

}
