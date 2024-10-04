import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resap33Component } from './resap33.component';

describe('Resap33Component', () => {
  let component: Resap33Component;
  let fixture: ComponentFixture<Resap33Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Resap33Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resap33Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
