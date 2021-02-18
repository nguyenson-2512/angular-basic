import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, exhaustMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import * as authActions from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
// import { TokenStorageService } from '../../services/token-storage.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService // private tokenStorageService: TokenStorageService,
  ) // private router: Router
  {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap((action) =>
        this.authService.login(action.user.username, action.user.password).pipe(
          map((response) => authActions.loginSuccess(response)),
          catchError((error: any) => of(authActions.loginFailure(error)))
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

  // login$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(authActions.login),
  //       switchMap((action) =>
  //         this.authService.login(action.user.username, action.user.password)
  //       )
  //     ),
  //   { dispatch: false }
  // );

  // checkauth$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(authActions.checkAuth),
  //     switchMap(() =>
  //       this.tokenStorageService
  //         .getToken()
  //         .pipe(
  //           map((isLoggedIn) =>
  //             authActions.checkAuthComplete({ isLoggedIn })
  //           )
  //         )
  //     )
  //   )
  // );

  // checkAuthComplete$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromAuthActions.checkAuthComplete),
  //     switchMap(({ isLoggedIn }) => {
  //       if (isLoggedIn) {
  //         return this.authService.userData.pipe(
  //           map((profile) =>
  //             fromAuthActions.loginComplete({ profile, isLoggedIn })
  //           )
  //         );
  //       }
  //       return of(fromAuthActions.logoutComplete());
  //     })
  //   )
  // );

  // logout$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(authActions.logout),
  //     tap(() => this.tokenStorageService.signOut()),
  //     map(() => authActions.logoutComplete())
  //   )
  // );

  // logoutComplete$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(authActions.logoutComplete),
  //       tap(() => {
  //         this.router.navigate(['/']);
  //       })
  //     ),
  //   { dispatch: false }
  // );
}

