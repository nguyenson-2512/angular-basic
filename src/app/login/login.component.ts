import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { PostService } from '../services/post.service';

import { Store } from '@ngrx/store';
import * as authActions from '../store/actions/auth.actions';
import * as fromRoot from '../store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private readonly store: Store,
    private tokenStorage: TokenStorageService
  ) {
    this.store
      .select(fromRoot.userLogin)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('data::::', data);
        if (data.isLoadingSuccess && data.result.data.token) {
          this.tokenStorage.saveToken(data.result['data'].token);
          this.tokenStorage.saveUser(data.result['data'].user);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/home']);
        }
      });
  }

  onSubmit() {
    this.store.dispatch(
      authActions.login({
        user: { username: this.form.username, password: this.form.password },
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  // onSubmit(): void {
  //   const { username, password } = this.form;
  //   this.authService.login(username, password).subscribe(
  //     (res) => {
  //       this.tokenStorage.saveToken(res['data'].token);
  //       this.tokenStorage.saveUser(res['data'].user);

  //       this.isLoginFailed = false;
  //       this.isLoggedIn = true;
  //       this.navigate();
  //       // this.reloadPage()
  //     },
  //     (err) => {
  //       this.errorMessage = err.error.message;
  //       this.isLoginFailed = true;
  //     }
  //   );
  // }

  // reloadPage(): void {
  //   window.location.reload();
  // }

  // navigate() {
  //   this.router.navigate(['/home']);
  // }
}
