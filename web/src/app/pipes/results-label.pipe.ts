import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resultsLabel'
})
export class ResultsLabelPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if(value == 0)
    return `Zero ${args[0]}`;

    if(value == 1)
    return `1 ${args[0]}`;

    return `${value} ${args[1]}`;
  }

}
