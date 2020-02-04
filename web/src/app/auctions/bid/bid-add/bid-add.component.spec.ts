import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidAddComponent } from './bid-add.component';

describe('BidAddComponent', () => {
  let component: BidAddComponent;
  let fixture: ComponentFixture<BidAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
