import {ModuleWithProviders, NgModule} from '@angular/core';
import {TimePipe} from './time-ago.pipe';
//import {NGX_MOMENT_OPTIONS, NgxMomentOptions} from '../utility/pipes/date';




@NgModule({
  declarations: [
    TimePipe
  ],
  exports: [TimePipe]
})
export class UtilModule  { }
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
