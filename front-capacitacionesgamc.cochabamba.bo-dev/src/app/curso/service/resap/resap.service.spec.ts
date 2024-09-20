import { TestBed } from '@angular/core/testing';

import { ResapService } from './resap.service';

describe('ResapService', () => {
  let service: ResapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
