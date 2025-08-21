import { Injectable } from '@angular/core';
import { User } from '@aui/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  async getUser(username: string) {
    const user = await fetch(`/api/users/${username}`).then(r => r.json()) as User;
    return user;
  }
}
