// @flow
import type {APIResponse, TChannelStore, TFirebaseServiceResponse, TChannelStoreWithKey} from '../types/';
import {statusCode} from './resources';
import {errorMessages} from './config';

export * from './firebase';
export * from './resources';
export * from './batches';
export * from './config';
export * from './styles';

export const snapshotExists = (snapshot) => {
  if (snapshot.val() === null) {
    return false;
  }
  return true;
};

export const firebaseServiceError = (promise: Promise<any>): Promise<APIResponse> => {
  return promise
    .catch((e): APIResponse => {
      console.log(e);
      return {
        status: statusCode.InternalError,
        message: errorMessages.internalError,
        snapshot: null,
      };
    })
    ;
};

export const firebaseServiceResponse =
(promise: Promise<any>): Promise<TFirebaseServiceResponse> => {
  const p = promise.then((snapshot): APIResponse => {
    return {
      status: snapshotExists(snapshot) ? statusCode.Ok : statusCode.NotFound,
      message: snapshotExists(snapshot) ? '' : errorMessages.notFound,
      snapshot,
    };
  });
  return firebaseServiceError(p);
};

// for transaction response
export const firebaseTxServiceResponse =
(promise: Promise<any>): Promise<TFirebaseServiceResponse> => {
  const p = promise.then((response) => {
    return response.snapshot;
  });
  return firebaseServiceError(firebaseServiceResponse(p));
};

export const handleServerError = (promise: Promise<any>): Promise<APIResponse> => {
  return promise
    .catch(() => {
      return {
        status: statusCode.InternalError,
        message: errorMessages.internalError,
      };
    })
    ;
};

export const isSuccess = (response: APIResponse) => response.status === statusCode.Ok;
export const isNotFound = (response: APIResponse) => response.status === statusCode.NotFound;

export const noop = () => {};

export const channelStoreArrayToObject = (channelsArray: TChannelStore[]) => {
  const channels: {[key: string]: TChannelStore} = {};
  channelsArray.forEach((channel) => {
    channels[channel.id] = channel;
  });
  return channels;
};

export const activeChannelStoreArray = (channelsArray: TChannelStore[]) => {
  return channelsArray.filter((channel) => {
    return channel.status === 'active';
  });
};

export const channelStoreArrayToActiveObject =
(channelsArray: TChannelStore[]): TChannelStoreWithKey => {
  return channelStoreArrayToObject(activeChannelStoreArray(channelsArray));
};
