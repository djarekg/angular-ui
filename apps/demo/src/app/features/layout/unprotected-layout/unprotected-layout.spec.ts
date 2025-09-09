import { ComponentFixture, TestBed } from '@angular/core/testing';

import UnprotectedLayout from './unprotected-layout';

describe('UnprotectedLayout', () => {
  let component: UnprotectedLayout;
  let fixture: ComponentFixture<UnprotectedLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnprotectedLayout],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UnprotectedLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
