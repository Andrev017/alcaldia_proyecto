import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResapCreateComponent } from './resap-create.component';

describe('ResapCreateComponent', () => {
  let component: ResapCreateComponent;
  let fixture: ComponentFixture<ResapCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResapCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResapCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
