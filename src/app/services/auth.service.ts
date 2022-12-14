import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../constant/backend';
import { iAuthRequest } from '../interfaces/auth';
import { ISession } from '../interfaces/session.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private loggedIn: boolean = false;

  async login(authentication:iAuthRequest): Promise<boolean> {
    const res = await fetch(BACKEND_URL + '/api/authentication/authenticate', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authentication),
    });
    if(!res.ok) return false
    const token = await res.text;
    console.log(token)
    if (!token) return false;
    this.setSession(token);
    return true;
  }

  isLoggedIn(){
    return this.loggedIn;
  }


  getSession(): ISession {
    const item: string = localStorage.getItem('session') || 'invalid';
    if (item !== 'invalid') {
      return JSON.parse(item);
    }
    return { expiresIn: '', token: '' };
  }

  setSession(token: any, expiresTimeHours: number = 24) {
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeHours);

    const session: ISession = {
      expiresIn: new Date(date).toISOString(),
      token,
    };

    localStorage.setItem('session', JSON.stringify(session));
    //window.location.reload();
  }

  async getMe() {
    const res = await fetch('', {
      headers: {
        Authorization: this.getSession().token!,
      },
    });
    return await res.json();
  }

  resetSession() {
    localStorage.removeItem('session');
    this.loggedIn = false;
    window.location.reload();
  }
}
 