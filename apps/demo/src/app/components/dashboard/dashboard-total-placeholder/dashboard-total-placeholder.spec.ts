import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalPlaceholder } from './dashboard-total-placeholder';

describe('DashboardTotalPlaceholder', () => {
  let component: DashboardTotalPlaceholder;
  let fixture: ComponentFixture<DashboardTotalPlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTotalPlaceholder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTotalPlaceholder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
