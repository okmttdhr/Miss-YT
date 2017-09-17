// @flow
import type {APIResponse, TChannelStore, TFirebaseServiceResponse} from '../types/';
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

export const firebaseServiceResponse =
(promise: Promise<any>): Promise<TFirebaseServiceResponse> => {
  return promise.then((snapshot): APIResponse => {
    return {
      status: snapshotExists(snapshot) ? statusCode.Ok : statusCode.NotFound,
      message: '',
      snapshot,
    };
  })
  .catch((): APIResponse => ({
    status: statusCode.InternalError,
    message: '',
    snapshot: null,
  }));
};

export const handleServerError = (promise: Promise<any>): Promise<APIResponse> => {
  return promise
    .catch(() => {
      return {
        status: statusCode.InternalError,
        message: '',
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
(channelsArray: TChannelStore[]): {[key: string]: TChannelStore} => {
  return channelStoreArrayToObject(activeChannelStoreArray(channelsArray));
};
