import { ApiService } from '@/core/api/api.service.js';
import { inject, Injectable } from '@angular/core';
import { User } from '@aui/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #api = inject(ApiService);

  getUser = (username: string) => this.#api.get<User>(`/users/${username}`);
  getUsers = () => this.#api.get<User[]>('/users');
}
