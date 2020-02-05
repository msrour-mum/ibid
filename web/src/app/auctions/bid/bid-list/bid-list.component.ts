import {Component, Input, OnInit} from '@angular/core';
import {Auction} from '../../auction';
import {EmitterService} from '../../../util/emitter.service';
import {AppConfig} from "../../../config/app.config";

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.css']
})
export class BidListComponent implements OnInit {
  @Input() auction: Auction;
  private hostUrl: string;
  constructor(private emitterService: EmitterService) {
  }
  ngOnInit() {
    this.hostUrl = AppConfig.settings.apiServiceUrl;
  }
}
