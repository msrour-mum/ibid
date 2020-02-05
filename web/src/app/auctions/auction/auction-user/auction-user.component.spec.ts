import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionUserComponent } from './auction-user.component';

describe('AuctionUserComponent', () => {
  let component: AuctionUserComponent;
  let fixture: ComponentFixture<AuctionUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
