import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterioevaCreateComponent } from './criterioeva-create.component';

describe('CriterioevaCreateComponent', () => {
  let component: CriterioevaCreateComponent;
  let fixture: ComponentFixture<CriterioevaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriterioevaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriterioevaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
