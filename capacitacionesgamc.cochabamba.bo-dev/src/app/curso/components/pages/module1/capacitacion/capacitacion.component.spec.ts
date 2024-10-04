import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionComponent } from './capacitacion.component';

describe('CapacitacionComponent', () => {
  let component: CapacitacionComponent;
  let fixture: ComponentFixture<CapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
