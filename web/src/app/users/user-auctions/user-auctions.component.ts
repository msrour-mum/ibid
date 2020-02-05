import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Auction} from '../../models/auction';
import {AuctionsApiService} from '../../auctions/auctions-api.service';
import {AuthenticationService} from '../../authentication/services/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-auctions',
  templateUrl: './user-auctions.component.html',
  styleUrls: ['./user-auctions.component.css']
})
export class UserAuctionsComponent implements OnInit {
  lstAuctions: Observable<Auction[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  userId: string;
  frmNext: FormGroup;
  frmPrevious: FormGroup;
  pageNo: number;

  constructor(private activeRouter: ActivatedRoute, private dataService: AuctionsApiService, private authService: AuthenticationService,
              private  fb: FormBuilder) {
    activeRouter.params.subscribe(p => {
      this.userId = p.id;
    });
    this.frmNext = fb.group({});
    this.frmPrevious = fb.group({});
    this.pageNo = 0;
  }

  loadData() {
    if (this.userId) {
      this.lstAuctions = this.dataService.listUserAuctions(this.userId, this.pageNo);
    } else {
      this.lstAuctions = this.dataService.listUserAuctions(this.authService.currentUser._id, this.pageNo);
    }
  }

  ngOnInit() {
    this.loadData();
  }

  onNext() {
    this.loadData();
    this.pageNo++;

  }

  onPrevious() {
    if (this.pageNo <= 0) {
      return;
    }
    this.loadData();
    this.pageNo--;
  }

}
