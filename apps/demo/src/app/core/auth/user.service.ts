import { ApiService } from '@/core/api/api.service.js';
import { inject, Injectable } from '@angular/core';
import { User } from '@aui/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #api = inject(ApiService);

  getUser = (id: string) => this.#api.get<User>(`/users/${id}`);
  getUsers = () => this.#api.get<User[]>('/users');
  updateUser = (user: User) => this.#api.post<User>(`/users/${user.id}`, user);
  createUser = (user: User) => this.#api.put<User>('/users', user);
  deleteUser = (id: string) => this.#api.delete<User>(`/users/${id}`);
}
