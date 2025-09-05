import { ApiService } from '@/core/api/api.service.js';
import { inject, Injectable } from '@angular/core';
import { Customer, CustomerHeaderInfo } from '@aui/api';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly #api = inject(ApiService);

  getCustomers = () => this.#api.get<Customer[]>('/customers');
  getCustomersHeaderInfo = () => this.#api.get<CustomerHeaderInfo[]>('/customers/header-info');
  getCustomer = (id: string) => this.#api.get<Customer>(`/customers/${id}`);
  updateCustomer = (id: string, customer: Customer) => this.#api.post(`/customers/${id}`, customer);
  createCustomer = (customer: Customer) => this.#api.put('/customers', customer);
  deleteCustomer = (id: string) => this.#api.delete(`/customers/${id}`);
}
