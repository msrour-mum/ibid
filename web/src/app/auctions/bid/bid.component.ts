import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {

  @Output() auctionId="5e376eddb7958812d82a765a";
  @Output() comments = null;
  
  constructor() { }

  ngOnInit() {
  }

}
