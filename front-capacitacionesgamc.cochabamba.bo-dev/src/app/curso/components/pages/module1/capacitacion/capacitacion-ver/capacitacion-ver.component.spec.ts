import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionVerComponent } from './capacitacion-ver.component';

describe('CapacitacionVerComponent', () => {
  let component: CapacitacionVerComponent;
  let fixture: ComponentFixture<CapacitacionVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacitacionVerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacitacionVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
