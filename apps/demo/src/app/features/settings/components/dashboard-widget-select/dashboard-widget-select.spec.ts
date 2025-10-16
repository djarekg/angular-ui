import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWidgetSelect } from './dashboard-widget-select';

describe('DashboardWidgetSelect', () => {
  let component: DashboardWidgetSelect;
  let fixture: ComponentFixture<DashboardWidgetSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardWidgetSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardWidgetSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
