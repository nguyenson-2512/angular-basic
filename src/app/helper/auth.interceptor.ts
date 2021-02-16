import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenStorageService } from '../services/token-storage.service';


const TOKEN_HEADER_KEY = 'Authorization';
// auto them token in header each request

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)})
    }

    return next.handle(authReq)
  }
}
// intercept() gets HTTPRequest object, change it and forward to HttpHandler object’s handle() method. It transforms HTTPRequest object into an Observable<HttpEvents>.

// next: HttpHandler object represents the next interceptor in the chain of interceptors. The final ‘next’ in the chain is the Angular HttpClient.

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]
