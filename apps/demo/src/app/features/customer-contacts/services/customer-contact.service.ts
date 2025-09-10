import { ApiService } from '@/core/api/api.service.js';
import { inject, Injectable } from '@angular/core';
import { CustomerContactModel } from '@aui/api';

@Injectable({
  providedIn: 'root',
})
export class CustomerContact {
  readonly #api = inject(ApiService);

  get() {
    return this.#api.get<CustomerContactModel[]>('/customer-contacts');
  }

  getForCustomer(customerId?: string) {
    const qs = customerId ? `?customerId=${encodeURIComponent(customerId)}` : '';
    return this.#api.get<CustomerContactModel[]>(`/customer-contacts${qs}`);
  }

  getById(id: string) {
    return this.#api.get<CustomerContactModel>(`/customer-contacts/${id}`);
  }

  create(data: { name: string; email: string; phone: string; }) {
    return this.#api.post('/customer-contacts', data);
  }

  update(
    id: string,
    data: { name?: string; email?: string; phone?: string; },
  ) {
    return this.#api.put(`/customer-contacts/${id}`, data);
  }

  remove(id: string) {
    return this.#api.delete(`/customer-contacts/${id}`);
  }
}
