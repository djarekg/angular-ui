import { ApiService } from '@/core/api/api.service.js';
import { CustomUserModel } from '@/features/users/forms/user.model.js';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '@aui/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #api = inject(ApiService);

  getUser = (id: string) => this.#api.get<UserModel>(`/users/${id}`);
  getUsers = () => this.#api.get<UserModel[]>('/users');
  updateUser = (user: CustomUserModel) =>
    this.#api.post<CustomUserModel>(`/users/${user.id}`, user);
  createUser = (user: CustomUserModel) =>
    this.#api.put<CustomUserModel, { id: string; }>('/users', user);
  deleteUser = (id: string) => this.#api.delete<UserModel>(`/users/${id}`);
}
