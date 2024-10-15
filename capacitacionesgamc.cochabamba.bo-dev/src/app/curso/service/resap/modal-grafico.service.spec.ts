import { TestBed } from '@angular/core/testing';

import { ModalGraficoService } from './modal-grafico.service';

describe('ModalGraficoService', () => {
  let service: ModalGraficoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalGraficoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
