import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
} from '@angular/core';
import { User } from '@aui/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #http = inject(HttpClient);

  getUser(username: string) {
    const { promise, resolve, reject } = Promise.withResolvers<User>();

    this.#http.get<User>(`/users/${username}`).subscribe({
      next: user => resolve(user),
      error: err => reject(err),
    });

    return promise;
  }
}
