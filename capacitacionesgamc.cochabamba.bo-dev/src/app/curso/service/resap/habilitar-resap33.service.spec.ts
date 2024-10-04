import { TestBed } from '@angular/core/testing';

import { HabilitarResap33Service } from './habilitar-resap33.service';

describe('HabilitarResap33Service', () => {
  let service: HabilitarResap33Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabilitarResap33Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
