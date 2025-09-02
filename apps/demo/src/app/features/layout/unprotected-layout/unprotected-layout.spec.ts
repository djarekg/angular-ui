import { ComponentFixture, TestBed } from '@angular/core/testing';

import UnprotectedLayoutContainer from './unprotected-layout';

describe('UnprotectedLayoutContainer', () => {
  let component: UnprotectedLayoutContainer;
  let fixture: ComponentFixture<UnprotectedLayoutContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnprotectedLayoutContainer],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UnprotectedLayoutContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
