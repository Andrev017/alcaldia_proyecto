import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionGraficoComponent } from './generacion-grafico.component';

describe('GeneracionGraficoComponent', () => {
  let component: GeneracionGraficoComponent;
  let fixture: ComponentFixture<GeneracionGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneracionGraficoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneracionGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
