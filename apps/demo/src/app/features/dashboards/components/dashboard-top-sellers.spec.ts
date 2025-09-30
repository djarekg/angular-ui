import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopSellers } from './dashboard-top-sellers';

describe('DashboardTopSellers', () => {
  let component: DashboardTopSellers;
  let fixture: ComponentFixture<DashboardTopSellers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTopSellers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTopSellers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
