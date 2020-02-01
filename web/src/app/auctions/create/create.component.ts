import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {AppValidator} from '../../app-validator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  frm: FormGroup;
  public currentDate: string;

  constructor(private  fb: FormBuilder) {
    this.currentDate = moment().add('day', 7).format('MM/DD/YYYY');
    console.log(this.currentDate);
    this.frm = fb.group(
      {
        title: ['', Validators.required],
        init_price: [0, [Validators.required, AppValidator.isPrice]],
        expiry_date: [this.currentDate, Validators.required]
      });
  }

  ngOnInit() {
  }

  OnSubmit(): void {
    console.log('you submitted value', this.frm.value);
  }
}
