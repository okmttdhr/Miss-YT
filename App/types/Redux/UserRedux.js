// @flow
import type {TUser} from '../User';

export type TDefaultUser = {
  item: TUser,
  isFetching: boolean,
  errorMessage: string,
}

export type TUserActions = {
  userRequest: () => any,
  userLogin: () => any,
  userCreate: () => any,
  userSuccess: (item: TUser) => any,
  userFailure: () => any,
}
