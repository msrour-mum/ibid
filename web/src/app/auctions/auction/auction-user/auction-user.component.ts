import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Auction} from '../../auction';
import {AuctionsApiService} from '../../auctions-api.service';
import {AuthenticationService} from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-auction-user',
  templateUrl: './auction-user.component.html',
  styleUrls: ['./auction-user.component.css']
})
export class AuctionUserComponent implements OnInit {

  lstAuctions: Observable<Auction[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: AuctionsApiService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.lstAuctions = this.dataService.listUserAuctions(this.authService.currentUser.email);

  }

}

