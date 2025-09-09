import { ComponentFixture, TestBed } from '@angular/core/testing';

import CustomerContacts from './customer-contacts';

describe('CustomerContacts', () => {
  let component: CustomerContacts;
  let fixture: ComponentFixture<CustomerContacts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerContacts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContacts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
