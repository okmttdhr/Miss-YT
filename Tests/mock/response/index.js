// @flow
import {range} from 'lodash';
import type {TLike, TChannel, TFirebaseServiceResponse} from '../../../App/types/';
import {channelMock} from '../channel';

const snapshotMock = (value: any) => ({
  key: 'key',
  val: () => value,
});

export const firebaseChannelMock = (i: number = 0): TChannel => {
  return channelMock(i);
};

const firebaseChannelsMock: Array<TChannel> =
  range(10).map((i: number): TChannel => firebaseChannelMock(i));

export const firebaseChannelsResponse = (status: number = 200): TFirebaseServiceResponse => {
  let response = {
    status: 200,
    message: '',
    snapshot: [
      snapshotMock(firebaseChannelsMock),
    ],
  };
  switch (status) {
    case 500:
      response = {
        status: 500,
        message: '',
        snapshot: null,
      };
      break;
    // no default
  }
  return response;
};

const firebaseLikeMock = (i: number = 0): TLike => ({
  id: `ID${i}`,
  channelId: `CHANNEL_ID${i}`,
  rank: 0 + i,
  count: 0 + i,
});

const firebaseLikesMock: Array<TChannel> =
  range(10).map((i: number): TLike => firebaseLikeMock(i));

export const firebaseLikesResponse = (status: number = 200): TFirebaseServiceResponse => {
  let response = {
    status: 200,
    message: '',
    snapshot: [
      snapshotMock(firebaseLikesMock),
    ],
  };
  switch (status) {
    case 500:
      response = {
        status: 500,
        message: '',
        snapshot: null,
      };
      break;
    // no default
  }
  return response;
};
