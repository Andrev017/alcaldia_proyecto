import { TestBed } from '@angular/core/testing';

import { CriterioEvaService } from './criterio-eva.service';

describe('CriterioEvaService', () => {
  let service: CriterioEvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriterioEvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
