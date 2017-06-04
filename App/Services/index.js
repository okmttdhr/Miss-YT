// @flow
import type {APIResponse} from '../types/';
import {statusCode} from './resources';

export * from './firebase';
export * from './resources';
export * from './batches';
export * from './styles';

export const snapshotExists = (snapshot) => {
  if (snapshot.val() === null) {
    return false;
  }
  return true;
};

export const isSuccess = (response: APIResponse) => response.status === statusCode.Ok;
