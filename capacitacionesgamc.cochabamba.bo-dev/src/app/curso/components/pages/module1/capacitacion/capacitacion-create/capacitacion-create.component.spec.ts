import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionCreateComponent } from './capacitacion-create.component';

describe('CapacitacionCreateComponent', () => {
  let component: CapacitacionCreateComponent;
  let fixture: ComponentFixture<CapacitacionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacitacionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacitacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
