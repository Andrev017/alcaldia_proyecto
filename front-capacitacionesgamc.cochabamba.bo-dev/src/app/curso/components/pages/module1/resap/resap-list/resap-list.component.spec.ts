import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResapListComponent } from './resap-list.component';

describe('ResapListComponent', () => {
  let component: ResapListComponent;
  let fixture: ComponentFixture<ResapListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResapListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
