import { TestBed } from '@angular/core/testing';

import { AuctionsApiService } from './auctions-api.service';

describe('AuctionsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuctionsApiService = TestBed.get(AuctionsApiService);
    expect(service).toBeTruthy();
  });
});
