import {NgModule} from '@angular/core';
import {TimePipe} from './time-ago.pipe';
import {AddBidDirective} from './add-bid.directive';
import { StatusDirective } from './status.directive';

//import {NGX_MOMENT_OPTIONS, NgxMomentOptions} from '../utility/pipes/date';


@NgModule({
  declarations: [
    TimePipe,
    AddBidDirective,
    StatusDirective
  ],
  exports: [TimePipe, AddBidDirective, StatusDirective]
})
export class UtilModule {
}

// static forRoot(options?: NgxMomentOptions): ModuleWithProviders {
//   return {
//     ngModule: UtilModule,
//     providers: [
//       {
//         provide: NGX_MOMENT_OPTIONS, useValue: {
//           ...options
//         }
//       }
//     ]
//   };
// }
// }
