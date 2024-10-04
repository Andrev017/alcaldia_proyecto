import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTraingComponent } from './info-traing.component';

describe('InfoTraingComponent', () => {
  let component: InfoTraingComponent;
  let fixture: ComponentFixture<InfoTraingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTraingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTraingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
