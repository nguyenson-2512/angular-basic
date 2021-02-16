import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Object> {
    return this.http.post(`${environment.apiUrl}login`,{
      username,
      password
    }, httpOptions)
  }

  register(username: string,email: string, password: string, confirmPassword: string): Observable<Object> {
    return this.http.post(`${environment.apiUrl}register`,{
      username,
      email,
      password,
      confirmPassword
    }, httpOptions)
  }
}
