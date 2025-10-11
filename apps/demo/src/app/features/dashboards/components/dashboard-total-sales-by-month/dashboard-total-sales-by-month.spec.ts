import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalSalesByMonth } from './dashboard-total-sales-by-month';

describe('DashboardTotalSalesByMonth', () => {
  let component: DashboardTotalSalesByMonth;
  let fixture: ComponentFixture<DashboardTotalSalesByMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTotalSalesByMonth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTotalSalesByMonth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
