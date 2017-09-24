// @flow
// import { call } from 'redux-saga/effects';
import type {TLikeWithKey} from '../../../types/';
import {isSuccess,
  isNotFound,
  firebaseTxServiceResponse,
  likesRef,
  channelsRef,
  getLikeWithChannelId,
} from '../../../Services/';
import {increase} from './increase';
import {_new} from './new';

export const likesPostToFirebase = {
  increase,
  likesSync: async (channelId: string, count: number, uid: string) => {
    console.log('likesSync');
    const likeResponse = await getLikeWithChannelId(uid, channelId);
    if (isNotFound(likeResponse)) {
      return _new(channelId, count, uid);
    }
    if (!isSuccess(likeResponse)) {
      return likeResponse;
    }
    const like: TLikeWithKey = likeResponse.snapshot.val();
    const likeKey: string = Object.keys(like)[0];
    const isDiff = count > like[likeKey].count;
    if (isDiff) {
      const tx = await firebaseTxServiceResponse(likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + (count - c)));
      return tx;
    }
    return {status: 200, message: ''};
  },
  channels: async (channelId: string, count: number) => {
    return firebaseTxServiceResponse(channelsRef.child(`${channelId}/likeCount`).transaction((c) => {
      if (!c && c !== 0) {
        return undefined;
      }
      return c + count;
    }));
  },
};
