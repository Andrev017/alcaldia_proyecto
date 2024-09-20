import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionListComponent } from './capacitacion-list.component';

describe('CapacitacionListComponent', () => {
  let component: CapacitacionListComponent;
  let fixture: ComponentFixture<CapacitacionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacitacionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacitacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
