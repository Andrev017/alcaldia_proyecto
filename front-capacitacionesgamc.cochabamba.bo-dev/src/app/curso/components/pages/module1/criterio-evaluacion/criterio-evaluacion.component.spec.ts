import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterioEvaluacionComponent } from './criterio-evaluacion.component';

describe('CriterioEvaluacionComponent', () => {
  let component: CriterioEvaluacionComponent;
  let fixture: ComponentFixture<CriterioEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriterioEvaluacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriterioEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
