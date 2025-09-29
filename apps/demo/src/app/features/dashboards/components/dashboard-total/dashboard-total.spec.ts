import { ComponentFixture, TestBed } from '@angular/core/testing';

import DashboardTotal from './dashboard-total';

describe('DashboardTotal', () => {
  let component: DashboardTotal;
  let fixture: ComponentFixture<DashboardTotal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTotal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTotal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
