import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

  getToken() {
    return !!window.sessionStorage.getItem('auth-token')
  }
}
