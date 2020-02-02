import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Auction} from '../auction';
import {AuctionsApiService} from '../auctions-api.service';
import {ActivatedRoute} from '@angular/router';

@Component({

  selector: 'auction-item',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id: object;
  item: Observable<Auction>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private auction: Auction;

  constructor(private activeRounter: ActivatedRoute, private dataService: AuctionsApiService) {
    activeRounter.params.subscribe(p => {
      this.id = p['id'];
    });
  }
  ngOnInit() {
    //this.item = this.dataService.loadOne(this.id);
  }

}
