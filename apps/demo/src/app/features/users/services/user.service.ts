import { ApiService } from '@/core/api/api.service.js';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '@aui/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #api = inject(ApiService);

  getUser = (id: string) => this.#api.get<UserModel>(`/users/${id}`);
  getUsers = () => this.#api.get<UserModel[]>('/users');
  updateUser = (user: UserModel) => this.#api.post<UserModel>(`/users/${user.id}`, user);
  createUser = (user: UserModel) => this.#api.put<UserModel, { id: string; }>('/users', user);
  deleteUser = (id: string) => this.#api.delete<UserModel>(`/users/${id}`);
}
