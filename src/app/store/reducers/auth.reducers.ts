import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as authActions from '../actions/auth.actions';
import * as storage from '../state/storage.state';

export interface State {
  user?: User;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  user: storage.getItem('user').user,
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const loginReducer = createReducer(
  initialState,
  on(authActions.login, (state, {user}) => ({user, isLoading: true})),
  on(authActions.loginSuccess, (state, result) => ({user: result.user, result, isLoading: false, isLoadingSuccess: true})),
  on(authActions.signup, (state, {user}) => ({user, isLoading: true})),
  on(authActions.signupSuccess, (state, result) => ({user: state.user, result, isLoading: false, isLoadingSuccess: true}))
);

export function reducer(state: State | undefined, action: Action): any {
  return loginReducer(state, action);
}

export const getLoggedInUser = (state: State) => {
  return {
    user: state.user,
    isLoadingSuccess: state.isLoadingSuccess
  }
};

export const userLogin = (state: State) => {
  return {
    user: state.user,
    result: state.result,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  }
};

export const userSignup = (state: State) => {
  return {
    user: state.user,
    result: state.result,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  }
};
