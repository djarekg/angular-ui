import { ApiService } from '@/core/api/api.service.js';
import { inject, Injectable } from '@angular/core';
import { CustomerHeaderInfo, CustomerModel } from '@aui/api';

type CustomerUpdateInput = Omit<CustomerModel, 'id' | 'dateCreated' | 'dateUpdated'>;

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly #api = inject(ApiService);

  getCustomers = () => this.#api.get<CustomerModel[]>('/customers');
  getCustomersHeaderInfo = () => this.#api.get<CustomerHeaderInfo[]>('/customers/header-info');
  getCustomer = (id: string) => this.#api.get<CustomerModel>(`/customers/${id}`);
  updateCustomer = (id: string, customer: CustomerUpdateInput) =>
    this.#api.post(`/customers/${id}`, customer);
  createCustomer = (customer: CustomerModel) => this.#api.put('/customers', customer);
  deleteCustomer = (id: string) => this.#api.delete(`/customers/${id}`);
}
