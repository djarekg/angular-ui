import { ComponentFixture, TestBed } from '@angular/core/testing';

import CustomerContactList from './customer-contact-list';

describe('CustomerContactList', () => {
  let component: CustomerContactList;
  let fixture: ComponentFixture<CustomerContactList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerContactList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContactList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
