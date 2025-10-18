import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalAmountPlaceholder } from './dashboard-total-amount-placeholder';

describe('DashboardTotalAmountPlaceholder', () => {
  let component: DashboardTotalAmountPlaceholder;
  let fixture: ComponentFixture<DashboardTotalAmountPlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTotalAmountPlaceholder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTotalAmountPlaceholder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
