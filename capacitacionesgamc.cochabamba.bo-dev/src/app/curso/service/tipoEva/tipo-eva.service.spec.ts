import { TestBed } from '@angular/core/testing';

import { TipoEvaService } from './tipo-eva.service';

describe('TipoEvaService', () => {
  let service: TipoEvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
