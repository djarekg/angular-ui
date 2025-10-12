import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductTypesTotalSalesByMonth } from './dashboard-product-types-total-sales-by-month';

describe('DashboardProductTypesTotalSalesByMonth', () => {
  let component: DashboardProductTypesTotalSalesByMonth;
  let fixture: ComponentFixture<DashboardProductTypesTotalSalesByMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProductTypesTotalSalesByMonth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProductTypesTotalSalesByMonth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
