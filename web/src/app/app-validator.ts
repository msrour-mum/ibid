import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';

export class AppValidator {

  static isInteger(control: FormControl): { 'Invalid Number ': boolean } {
    if (control.value && !/^\d+$/.test(control.value) ) {
      return { 'Invalid Number ': true };
    }
    return null;
  }


  static isPrice(control: FormControl): { 'Invalid Number ': boolean } {
    if (control.value &&  !/^[0-9]*(\.[0-9]{0,2})?$/.test(control.value) ) {
      return { 'Invalid Number ': true };
    }
    return null;
  }

}
