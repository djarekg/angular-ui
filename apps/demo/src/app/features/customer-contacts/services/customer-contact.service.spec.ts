import { TestBed } from '@angular/core/testing';

import { CustomerContact } from './customer-contact.service';

describe('CustomerContact', () => {
  let service: CustomerContact;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerContact);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
