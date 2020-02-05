import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Auction} from '../../../models/auction';
import {AuctionsApiService} from '../../auctions-api.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-auction-home',
  templateUrl: './auction-home.component.html',
  styleUrls: ['./auction-home.component.css']
})
export class AuctionHomeComponent implements OnInit {

  lstAuctions: Observable<Auction[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  frmNext: FormGroup;
  frmPrevious: FormGroup;
  pageNo: number;

  constructor(private dataService: AuctionsApiService, private  fb: FormBuilder) {
    this.frmNext = fb.group({});
    this.frmPrevious = fb.group({});
    this.pageNo = 0;
  }

  ngOnInit() {
    this.lstAuctions = this.dataService.list(this.pageNo);
  }

  onNext() {
    this.lstAuctions = this.dataService.list(this.pageNo);
    this.pageNo++;

  }

  onPrevious() {
    if (this.pageNo <= 0) {
      return;
    }
    this.lstAuctions = this.dataService.list(this.pageNo);
    this.pageNo--;
  }
}
