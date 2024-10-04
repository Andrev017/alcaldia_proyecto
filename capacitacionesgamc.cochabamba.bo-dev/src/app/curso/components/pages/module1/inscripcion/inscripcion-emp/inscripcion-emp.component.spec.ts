import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionEmpComponent } from './inscripcion-emp.component';

describe('InscripcionEmpComponent', () => {
  let component: InscripcionEmpComponent;
  let fixture: ComponentFixture<InscripcionEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscripcionEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
