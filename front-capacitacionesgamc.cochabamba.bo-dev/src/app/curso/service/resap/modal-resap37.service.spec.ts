import { TestBed } from '@angular/core/testing';

import { ModalResap37Service } from './modal-resap37.service';

describe('ModalResap37Service', () => {
  let service: ModalResap37Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalResap37Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
