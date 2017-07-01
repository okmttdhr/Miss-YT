// @flow
import type {TUser} from '../User';
import type {TAction} from './index';

export type TDefaultUser = {
  item: TUser,
  isFetching: boolean,
  errorMessage: string,
}

export type TUserAuthenticateAction = TAction & {
  email: string, password: string,
}

export type TAuthenticate = (email: string, password: string) => any;

export type TUserActions = {
  userRequest: () => any,
  userLogin: TAuthenticate,
  userCreate: TAuthenticate,
  userSuccess: (item: TUser) => any,
  userFailure: () => any,
}
