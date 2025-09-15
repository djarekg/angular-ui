import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPopover } from './filter-popover';

describe('FilterPopover', () => {
  let component: FilterPopover;
  let fixture: ComponentFixture<FilterPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPopover]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPopover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
