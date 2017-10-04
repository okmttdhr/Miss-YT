// @flow
import { call } from 'redux-saga/effects';
import {
  handleServerError,
  likesRef,
} from '../../../Services/';

export const createOnFirebase = (channelId: string, count: number, uid: string) => {
  return handleServerError(
    likesRef.child(uid)
      .push({channelId, rank: 0, count})
      .then(() => {
        return {status: 200, message: '', snapshot: null};
      }),
  );
};

export function* _new<T>(channelId: string, count: number, uid: string): Generator<T, any, any> {
  yield call(createOnFirebase, channelId, count, uid);
}
