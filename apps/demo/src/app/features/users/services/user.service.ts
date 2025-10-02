import { ApiService } from '@/core/api/api.service.js';
import { UserFormModel } from '@/features/users/forms/user-form.model.js';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '@aui/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #api = inject(ApiService);

  getUser = (id: string) => this.#api.get<UserModel>(`/users/${id}`);
  getUsers = () => this.#api.get<UserModel[]>('/users');
  updateUser = (user: UserFormModel) => this.#api.post<UserFormModel>(`/users/${user.id}`, user);
  createUser = (user: UserFormModel) =>
    this.#api.put<UserFormModel, { id: string; }>('/users', user);
  deleteUser = (id: string) => this.#api.delete<UserModel>(`/users/${id}`);
}
