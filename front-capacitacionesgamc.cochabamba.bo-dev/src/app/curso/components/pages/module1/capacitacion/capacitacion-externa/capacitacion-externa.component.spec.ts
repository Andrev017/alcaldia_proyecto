import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionExternaComponent } from './capacitacion-externa.component';

describe('CapacitacionExternaComponent', () => {
  let component: CapacitacionExternaComponent;
  let fixture: ComponentFixture<CapacitacionExternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacitacionExternaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacitacionExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
