import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAddBid]'
})
export class AddBidDirective implements OnInit {

  @Input() msgType: string;
  @HostBinding('style.display') dispalyvisible;

  constructor(private elementRef: ElementRef, private render: Renderer2) {
    console.log('this.msgType', this.msgType);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    console.log('************************');
    if (this.msgType == 'success') {
      this.dispalyvisible = 'none';
    }

  }

  @HostListener('submit')    onSubmit(){
  if (this.msgType == 'success') {
  this.dispalyvisible = 'none';
}
}


    // if (!this.msgType) {
    //   return;
    // }
    // if (this.msgType == 'success') {
    //
    //   const div = this.render.createElement('div').a;
    //   this.render.addClass(div, 'alert alert-success');
    //   const text = this.render.createText('<strong>Bid added successfully , </strong>' + this.msg);
    //   this.render.appendChild(div, text);
    //   this.render.appendChild(this.elementRef.nativeElement, div);
    // }
    // if (this.msgType == 'warning') {
    //
    //   const div = this.render.createElement('div').a;
    //   this.render.addClass(div, 'alert alert-danger');
    //   const text = this.render.createText('<strong>Not Valid !</strong>' + this.msg);
    //   this.render.appendChild(div, text);
    //   this.render.appendChild(this.elementRef.nativeElement, div);
    // }


  }
