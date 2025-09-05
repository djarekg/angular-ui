import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactDetail } from './customer-contact-detail';

describe('CustomerContactDetail', () => {
  let component: CustomerContactDetail;
  let fixture: ComponentFixture<CustomerContactDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerContactDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContactDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
