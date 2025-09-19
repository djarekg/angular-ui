import { ApiService } from '@/core/api/api.service.js';
import { inject, Injectable } from '@angular/core';
import { ProductModel, ProductType } from '@aui/api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly #api = inject(ApiService);

  get = (productTypes: ProductType[]) =>
    this.#api.get<ProductModel[]>(`/products?productTypes=${productTypes.join(',')}`);
  getById = (id: string) => this.#api.get<ProductModel>(`/products/${id}`);
  update = (product: ProductModel) =>
    this.#api.post<ProductModel>(`/produts/${product.id}`, product);
  create = (product: ProductModel) => this.#api.put<ProductModel>(`/produts`, product);
  remove = (id: string) => this.#api.delete(`/products/${id}`);
}
