import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterioevaListComponent } from './criterioeva-list.component';

describe('CriterioevaListComponent', () => {
  let component: CriterioevaListComponent;
  let fixture: ComponentFixture<CriterioevaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriterioevaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriterioevaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
