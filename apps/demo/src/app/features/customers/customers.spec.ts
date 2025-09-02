import { ComponentFixture, TestBed } from '@angular/core/testing';

import CustomersContainer from './customers';

describe('CustomersContainer', () => {
  let component: CustomersContainer;
  let fixture: ComponentFixture<CustomersContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersContainer],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomersContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
