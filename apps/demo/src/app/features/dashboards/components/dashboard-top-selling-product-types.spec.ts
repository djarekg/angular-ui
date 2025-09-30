import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopSellingProductTypes } from './dashboard-top-selling-product-types';

describe('DashboardTopSellingProductTypes', () => {
  let component: DashboardTopSellingProductTypes;
  let fixture: ComponentFixture<DashboardTopSellingProductTypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTopSellingProductTypes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTopSellingProductTypes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
