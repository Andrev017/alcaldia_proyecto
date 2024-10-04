import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AclaratorioCapacitacionComponent } from './aclaratorio-capacitacion.component';

describe('AclaratorioCapacitacionComponent', () => {
  let component: AclaratorioCapacitacionComponent;
  let fixture: ComponentFixture<AclaratorioCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AclaratorioCapacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AclaratorioCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
