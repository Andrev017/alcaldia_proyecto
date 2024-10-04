import { TestBed } from '@angular/core/testing';

import { MosalResap37Service } from './mosal-resap37.service';

describe('MosalResap37Service', () => {
  let service: MosalResap37Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MosalResap37Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
