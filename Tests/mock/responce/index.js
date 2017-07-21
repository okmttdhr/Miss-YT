// @flow
import {range} from 'lodash';
import type {TLike, TChannel, FirebaseServiceResponse} from '../../../App/types/';

const snapshotMock = (value: any) => ({
  key: 'key',
  val: () => value,
});

// separate store's channel from firebase's channel considering readability as mock
export const firebaseChannelMock = (i: number = 0): TChannel => ({
  id: `ID${i}`,
  createdAt: 12345,
  modifiedAt: 12345,
  rank: 0,
  score: i + 1,
  likeCount: 0,
  status: i % 2 === 0 ? 'active' : 'inactive',
  youtube: {
    id: `ID${i}`,
    name: `NAME${i}`,
    description: `DESCRIPTION${i}`,
    thumbnail: `THUMBNAIL${i}`,
    banner: `BANNER${i}`,
    subscriberCount: i + 1,
    viewCount: i + 1,
  },
});

const firebaseChannelsMock: Array<TChannel> =
  range(10).map((i: number): TChannel => firebaseChannelMock(i));

export const firebaseChannelsResponse = (status: number = 200): FirebaseServiceResponse => {
  let responce = {
    status: 200,
    message: '',
    snapshot: [
      snapshotMock(firebaseChannelsMock),
    ],
  };
  switch (status) {
    case 500:
      responce = {
        status: 500,
        message: '',
        snapshot: null,
      };
      break;
    // no default
  }
  return responce;
};

export const firebaseLikeMock = (i: number = 0): TLike => ({
  id: `ID${i}`,
  channelId: `CHANNEL_ID${i}`,
  rank: 0 + i,
  count: 0 + i,
});

const firebaseLikesMock: Array<TChannel> =
  range(10).map((i: number): TLike => firebaseLikeMock(i));

export const firebaseLikesResponse = (status: number = 200): FirebaseServiceResponse => {
  let responce = {
    status: 200,
    message: '',
    snapshot: [
      snapshotMock(firebaseLikesMock),
    ],
  };
  switch (status) {
    case 500:
      responce = {
        status: 500,
        message: '',
      };
      break;
    // no default
  }
  return responce;
};
