import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Auction} from '../../auctions/auction';
import {AuctionsApiService} from '../../auctions/auctions-api.service';
import {AuthenticationService} from '../../authentication/services/authentication.service';

@Component({
  selector: 'app-user-auctions',
  templateUrl: './user-auctions.component.html',
  styleUrls: ['./user-auctions.component.css']
})
export class UserAuctionsComponent implements OnInit {
  lstAuctions: Observable<Auction[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: AuctionsApiService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.lstAuctions = this.dataService.listUserAuctions(this.authService.currentUser.email);
    //this.lstAuctions = this.dataService.list();

  }

}
