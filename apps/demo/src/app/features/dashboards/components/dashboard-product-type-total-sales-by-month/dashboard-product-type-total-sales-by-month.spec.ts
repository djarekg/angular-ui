import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductTypeTotalSalesByMonth } from './dashboard-product-type-total-sales-by-month';

describe('DashboardTotalSalesByMonth', () => {
  let component: DashboardProductTypeTotalSalesByMonth;
  let fixture: ComponentFixture<DashboardProductTypeTotalSalesByMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProductTypeTotalSalesByMonth],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardProductTypeTotalSalesByMonth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
