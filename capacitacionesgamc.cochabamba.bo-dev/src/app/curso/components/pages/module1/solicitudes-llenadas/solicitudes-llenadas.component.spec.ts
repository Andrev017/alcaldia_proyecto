import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesLlenadasComponent } from './solicitudes-llenadas.component';

describe('SolicitudesLlenadasComponent', () => {
  let component: SolicitudesLlenadasComponent;
  let fixture: ComponentFixture<SolicitudesLlenadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesLlenadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesLlenadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
