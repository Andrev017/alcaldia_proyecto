import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterioevaFormComponent } from './criterioeva-form.component';

describe('CriterioevaFormComponent', () => {
  let component: CriterioevaFormComponent;
  let fixture: ComponentFixture<CriterioevaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriterioevaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriterioevaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
