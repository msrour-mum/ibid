import {Component, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Auction} from '../../auction';
import {AuctionsApiService} from '../../auctions-api.service';
import {AppConfig} from "../../../config/app.config";



@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  @Input() lstAuctions: Observable<Auction[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private hostUrl: string;

  constructor(private dataService: AuctionsApiService) {
  }

  ngOnInit() {
    this.hostUrl = AppConfig.settings.apiServiceUrl;
    this.lstAuctions = this.dataService.list();

  }

}
