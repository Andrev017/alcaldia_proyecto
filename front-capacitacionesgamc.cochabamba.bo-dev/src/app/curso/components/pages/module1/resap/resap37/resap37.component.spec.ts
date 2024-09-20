import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resap37Component } from './resap37.component';

describe('Resap37Component', () => {
  let component: Resap37Component;
  let fixture: ComponentFixture<Resap37Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Resap37Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resap37Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
