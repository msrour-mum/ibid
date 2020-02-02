import { Component, OnInit } from '@angular/core';
import {Auction} from '../auction';
import {Observable, Subject} from 'rxjs';
import {AuctionsApiService} from '../auctions-api.service';
import {TimePipe} from '../../util/time-ago.pipe';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  lstAuctions: Observable<Auction[]> ;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private auction: Auction;
  constructor(private dataService: AuctionsApiService) { }

  ngOnInit() {

      this.lstAuctions = this.dataService.list();

  }

}
