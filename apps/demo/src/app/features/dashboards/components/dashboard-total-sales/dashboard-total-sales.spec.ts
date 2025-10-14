import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalSales } from './dashboard-total-sales';

describe('DashboardTotalSales', () => {
  let component: DashboardTotalSales;
  let fixture: ComponentFixture<DashboardTotalSales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTotalSales],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTotalSales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
