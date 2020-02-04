import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {AppValidator} from '../../app-validator';
import {AuctionsApiService} from '../auctions-api.service';
import {Subject} from 'rxjs';
import {Auction} from '../auction';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  frm: FormGroup;
  public currentDate: string;
  incomeData: Auction[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  private auction: Auction;

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  constructor(private dataService: AuctionsApiService, private  fb: FormBuilder) {
    this.currentDate = moment().add('day', 7).format('MM/DD/YYYY');
    console.log(this.currentDate);
    this.frm = fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        init_price: [0, [Validators.required, AppValidator.isPrice]],
        expiry_date: [this.currentDate, Validators.required]
      });
  }

  ngOnInit() {
    console.log('Onine'),
      this.dataService.list().subscribe((result: any) => {
        console.log(result.data);
        this.incomeData = result.data;
      });
  }
  OnSubmit(): void {
    this.auction = this.frm.value;
    this.auction.bid_price = this.auction.init_price;
    this.auction.user = {name: 'Moustafa Zein', email: 'mzein@mum.ed'};
    this.dataService.save(this.auction) .subscribe(resp => {
      console.log('add auction : ',resp);
    });
  }

}
