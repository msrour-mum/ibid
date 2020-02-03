import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  emitter = new EventEmitter();

  emitValue(val: any) {
    this.emitter.emit(val);
  }

  constructor() {
  }
}
