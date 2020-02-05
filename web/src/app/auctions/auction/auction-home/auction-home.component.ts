import {Component, OnInit} from '@angular/core';
import {Observable, Subject, of, zip} from 'rxjs';
import {merge, map} from 'rxjs/operators'
import {Auction} from '../../../models/auction';
import {AuctionsApiService} from '../../auctions-api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-auction-home',
  templateUrl: './auction-home.component.html',
  styleUrls: ['./auction-home.component.css']
})
export class AuctionHomeComponent implements OnInit {

  lstAuctions: Observable<Auction[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  options={};
  pageNo: number;
  limit: number;
  chart:Chart;
  showChart:boolean = false;
  topUsers;

  constructor(private dataService: AuctionsApiService, private  fb: FormBuilder) {
    
    this.pageNo = 1;
    this.limit = 2;
  }

    ngOnInit() {
    this.dataService.listInfiniteScroll(this.pageNo,this.limit,'Open').toPromise().then(result=>{
      this.lstAuctions = of(result['docs']);
      this.options['total'] =  result['total'];
      this.options['limit'] =  result['limit'];
      this.options['page'] =  result['page'];
      this.options['pages'] =  result['pages'];
    });


    
    
  }

   onScroll() {


    if(this.options['page'] <= this.options['pages']){
    console.log('scrolled!!');
    this.pageNo += 1;
    this.dataService.listInfiniteScroll(this.pageNo,this.limit,'Open').toPromise().then(result=>{
      
      this.lstAuctions =  zip(this.lstAuctions, of(result['docs']))
  .pipe(map(x => x[0].concat(x[1])))

      this.options['total'] =  result['total'];
      this.options['limit'] =  result['limit'];
      this.options['page'] =  result['page'];
      this.options['pages'] =  result['pages'];
    });
    }else{
      if(!this.showChart)
        this.bindTopUsers();
      this.showChart = true;
      
    }
    
  }
  
  
  bindTopUsers()
  {
    this.dataService.topUsers(5).toPromise().then(result=>{
      var arr :any = [];
     var topUsersArr =  result.map(user =>[user.name, user.countTopUsers]);

      //Bind Chart
      this.chart = new Chart({
        chart: {
          type: 'pie',

        },
        title: {
          text: 'Top iBid Users'
        },
        credits: {
          enabled: false
        },

        series: [{
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
             enabled: true},
          showInLegend: true,
          type: 'pie',
          name: 'Top iBid Users',
          data: 
            topUsersArr 
            }
        ]
      });
    });  
  }
  
}
