import { ComponentFixture, TestBed } from '@angular/core/testing';

import CustomerContact from './customer-contact';

describe('CustomerContact', () => {
  let component: CustomerContact;
  let fixture: ComponentFixture<CustomerContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
