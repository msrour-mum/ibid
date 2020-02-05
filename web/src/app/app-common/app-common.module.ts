import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddBidDirective} from './directives/add-bid.directive';
import {StatusDirective} from './directives/status.directive';
import {AuthGuard} from './guards/authGaurd';
import {ResultsLabelPipe} from './pipes/results-label.pipe';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {TimePipe} from './pipes/time-ago.pipe';
import {CommentsService} from './services/comments.service';
import {DataService} from './services/data.service';
import {EmitterService} from './services/emitter.service';
import {AppValidator} from './validators/app-validator';


@NgModule({


  declarations: [AddBidDirective, StatusDirective, ResultsLabelPipe, TimePipe],

  imports: [
    CommonModule
  ],
  exports: [
    AddBidDirective, StatusDirective,  ResultsLabelPipe, TimePipe
  ]
})
export class AppCommonModule {
}
