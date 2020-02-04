import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Auction} from '../../auction';
import {Subject} from 'rxjs';
import {AuctionsApiService} from '../../auctions-api.service';
import * as moment from 'moment';
import {AppValidator} from '../../../app-validator';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auction-add',
  templateUrl: './auction-add.component.html',
  styleUrls: ['./auction-add.component.css']
})
export class AuctionAddComponent implements OnInit {
  frm: FormGroup;
  public currentDate: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private auction: Auction;
  private errorMsg: string;

  constructor(private dataService: AuctionsApiService, private  fb: FormBuilder,
              private router: Router, private authService: AuthenticationService) {

    this.currentDate = moment().add(7, 'day').format('MM/DD/YYYY');
    this.frm = fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        init_price: [0, [Validators.required, AppValidator.isPrice]],
        expiry_date: [this.currentDate, Validators.required]
      });

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  OnSubmit(): void {
    this.errorMsg = null;
    this.auction = this.frm.value;
    this.auction.bid_price = this.auction.init_price;

    if (this.auction.bid_price < 0) {
      this.errorMsg = 'bid price could not be negative number';
      return;
    }
    const duration = moment.duration(moment(this.auction.expiry_date).diff(moment()));
    const durationDays = duration.asDays();
    if (durationDays < 0) {
      this.errorMsg = 'expiry date could not be date befor today';
      return;
    }
    if (durationDays > 10) {
      this.errorMsg = 'expiry date could not be more than 10 days';
      return;
    }

    this.auction.count_comments = this.auction.count_dislike = this.auction.count_like = this.auction.count_bids = 0;
    this.auction.user = this.authService.currentUser;
    this.dataService.save(this.auction).subscribe(( err:any) => {
      // console.log('add auction : ',resp);
      // if (err) {
      //   this.errorMsg = err;
      // }
    });

    this.router.navigate(['/home']);
  }


}
