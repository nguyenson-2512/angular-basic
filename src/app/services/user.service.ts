import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getInfo() {
    const user = window.sessionStorage.getItem(environment.USER_KEY);
    if(user) {
      return JSON.parse(user)
    }
    return;
  }
}
