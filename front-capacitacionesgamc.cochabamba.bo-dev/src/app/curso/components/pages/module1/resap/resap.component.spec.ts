import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResapComponent } from './resap.component';

describe('ResapComponent', () => {
  let component: ResapComponent;
  let fixture: ComponentFixture<ResapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
