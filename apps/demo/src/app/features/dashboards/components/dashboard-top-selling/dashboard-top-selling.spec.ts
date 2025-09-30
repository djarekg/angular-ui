import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopSelling } from './dashboard-top-selling';

describe('DashboardTopSelling', () => {
  let component: DashboardTopSelling;
  let fixture: ComponentFixture<DashboardTopSelling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTopSelling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTopSelling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
