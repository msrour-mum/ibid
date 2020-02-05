import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Auction} from '../../models/auction';
import {AuctionsApiService} from '../../auctions/auctions-api.service';
import {AuthenticationService} from '../../authentication/services/authentication.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-auctions',
  templateUrl: './user-auctions.component.html',
  styleUrls: ['./user-auctions.component.css']
})
export class UserAuctionsComponent implements OnInit {
  lstAuctions: Observable<Auction[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  userId: string;

  constructor(private activeRouter: ActivatedRoute, private dataService: AuctionsApiService, private authService: AuthenticationService) {
    activeRouter.params.subscribe(p => {
      this.userId = p.id;
    });
  }

  ngOnInit() {
    if (this.userId) {
      this.lstAuctions = this.dataService.listUserAuctions(this.userId);
    } else {
      this.lstAuctions = this.dataService.listUserAuctions(this.authService.currentUser._id);
    }
  }

}
