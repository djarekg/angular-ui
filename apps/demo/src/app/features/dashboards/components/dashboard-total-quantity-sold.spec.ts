import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalQuantitySold } from './dashboard-total-quantity-sold';

describe('DashboardTotalQuantitySold', () => {
  let component: DashboardTotalQuantitySold;
  let fixture: ComponentFixture<DashboardTotalQuantitySold>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTotalQuantitySold],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardTotalQuantitySold);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
