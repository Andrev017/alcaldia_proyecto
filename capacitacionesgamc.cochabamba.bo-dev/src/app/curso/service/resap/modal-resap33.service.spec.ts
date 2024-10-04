import { TestBed } from '@angular/core/testing';

import { ModalResap33Service } from './modal-resap33.service';

describe('ModalResap33Service', () => {
  let service: ModalResap33Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalResap33Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
