import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  login(token: string): void {
    localStorage.setItem('authToken', token);
  }


}
