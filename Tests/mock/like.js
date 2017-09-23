// @flow
// import {range} from 'lodash';
import type {TLike, TLikeWithKey} from '../../App/types/like';

export const likeMock = (i: number = 0): TLike => {
  return {
    channelId: `CHANNELID${i}`,
    rank: i,
    count: i,
  };
};

export const likeWithKeyMock = (i: number = 0): TLikeWithKey => {
  return {
    [`KEY${i}`]: likeMock(i),
  };
};
