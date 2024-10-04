import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResap33Component } from './modal-resap33.component';

describe('ModalResap33Component', () => {
  let component: ModalResap33Component;
  let fixture: ComponentFixture<ModalResap33Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalResap33Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResap33Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
