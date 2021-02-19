import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as authActions from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  )
  {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap((action) =>
        this.authService.login(action.user.username, action.user.password).pipe(
          map((response) => authActions.loginSuccess(response)),
          catchError((error: any) => of(authActions.loginFailure(error))),
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signup),
      exhaustMap((action) =>
        this.authService
          .register(
            action.user.username,
            action.user.email,
            action.user.password,
            action.user.password
          )
          .pipe(
            map((response) => authActions.signupSuccess(response)),
            catchError((error: any) => of(authActions.signupFailure(error)))
          )
      )
    )
  );
}

