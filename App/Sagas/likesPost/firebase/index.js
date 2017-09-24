// @flow
// import { call } from 'redux-saga/effects';
import {
  firebaseTxServiceResponse,
  channelsRef,
} from '../../../Services/';
import {sync} from './sync';
import {increase} from './increase';

export const likesPostToFirebase = {
  increase,
  sync,
  channels: async (channelId: string, count: number) => {
    return firebaseTxServiceResponse(channelsRef.child(`${channelId}/likeCount`).transaction((c) => {
      if (!c && c !== 0) {
        return undefined;
      }
      return c + count;
    }));
  },
};
