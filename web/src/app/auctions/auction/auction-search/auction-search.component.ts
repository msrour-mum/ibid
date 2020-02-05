import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Auction} from '../../../models/auction';
import {AuctionsApiService} from '../../auctions-api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-auction-search',
  templateUrl: './auction-search.component.html',
  styleUrls: ['./auction-search.component.css']
})
export class AuctionSearchComponent implements OnInit {
  searchTerm: object;
  lstAuctions: Observable<Auction[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private activeRouter: ActivatedRoute, private dataService: AuctionsApiService) {
    activeRouter.queryParams.subscribe(p => {
      this.searchTerm = p.q;
    });

  }

  ngOnInit() {
    console.log('this.searchTerm', this.searchTerm)
    this.lstAuctions = this.dataService.search(this.searchTerm);

  }

}
