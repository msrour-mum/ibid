import {Directive, ElementRef, HostBinding, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appStatus]'
})
export class StatusDirective implements OnInit{
  @HostBinding('style.color') colorStyle;
  @Input() status: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    console.log(this.status)
    switch (this.status) {
      case 'Initiated': {
        this.colorStyle = 'green';
        break;
      }
      case 'Open': {
        this.colorStyle = 'green';
        break;
      }
      case 'Sold': {
        this.colorStyle = 'blue';
        break;
      }
      case 'Expired': {
        this.colorStyle = 'red';
        break;
      }
      default:{
        this.colorStyle = 'yellow';
        break;

      }
    }
  }


}
