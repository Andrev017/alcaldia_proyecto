import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCapacitacionComponent } from './info-capacitacion.component';

describe('InfoCapacitacionComponent', () => {
  let component: InfoCapacitacionComponent;
  let fixture: ComponentFixture<InfoCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCapacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
