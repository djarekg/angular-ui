import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@aui/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  async getUser(username: string) {
    return httpResource<User>(() => `/users/${username}`);
  }
}
