import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionEmpComponent } from './capacitacion-emp.component';

describe('CapacitacionEmpComponent', () => {
  let component: CapacitacionEmpComponent;
  let fixture: ComponentFixture<CapacitacionEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacitacionEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacitacionEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
