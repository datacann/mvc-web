import { Injectable } from '@angular/core';

export interface User {
  email: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];

  login(email: string, password: string): boolean {
    return this.users.some(user => user.email === email && user.password === password);
  }

}
