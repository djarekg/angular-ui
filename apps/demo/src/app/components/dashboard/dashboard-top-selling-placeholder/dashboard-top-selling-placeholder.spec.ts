import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopSellingPlaceholder } from './dashboard-top-selling-placeholder';

describe('DashboardTopSellingPlaceholder', () => {
  let component: DashboardTopSellingPlaceholder;
  let fixture: ComponentFixture<DashboardTopSellingPlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTopSellingPlaceholder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTopSellingPlaceholder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
