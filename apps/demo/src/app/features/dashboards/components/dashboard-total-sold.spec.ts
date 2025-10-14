import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalSold } from './dashboard-total-sold';

describe('DashboardTotalSold', () => {
  let component: DashboardTotalSold;
  let fixture: ComponentFixture<DashboardTotalSold>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTotalSold],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTotalSold);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
