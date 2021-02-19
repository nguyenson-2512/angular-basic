import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'

import { Store } from '@ngrx/store';
import * as authActions from '../store/actions/auth.actions';
import * as fromRoot from '../store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor( private authService: AuthService, private readonly store: Store, private router: Router,) {
    this.store
    .select(fromRoot.userSignup)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      console.log('data::::', data);
      if (data.isLoadingSuccess && data.result.data.token) {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      }
    });
   }

  ngOnInit(): void {
  }

  // onSubmit():void {
  //   const { username, email, password, confirmPassword } = this.form

  //   this.authService.register(username, email, password, confirmPassword).subscribe(
  //     data => {
  //       console.log(data);
  //       this.isSuccessful = true;
  //       this.isSignUpFailed = false;
  //     },
  //     err => {
  //       this.errorMessage = err.error.message;
  //       this.isSignUpFailed = true
  //     }
  //   )
  // }

  onSubmit() {
    this.store.dispatch(
      authActions.signup({
        user: { username: this.form.username, email: this.form.email, password: this.form.password, confirmPassword: this.form.confirmPassword },
      })
    );
  }
}
