// @flow
import type {TLike, TLikeWithKey} from '../../types/';
import {isSuccess,
  isNotFound,
  firebaseServiceResponse,
  firebaseTxServiceResponse,
  handleServerError,
  likesRef,
  channelsRef,
  getLikeWithChannelId} from '../../Services/';

export const likesPostToFirebase = {
  likesNew: async (channelId: string, count: number, uid: string) => {
    const promise = await handleServerError(
      likesRef.child(uid)
        .push({channelId, rank: 0, count})
        .then(() => {
          return {status: 200, message: '', snapshot: null};
        }),
    );
    return promise;
  },
  // likesIncrease: function* test<T>(
  //   channelId: string, count: number, uid: string,
  // ): Generator<T, any, any> {
  likesIncrease: async (channelId: string, count: number, uid: string) => {
    console.log('likesIncrease');
    // const likeResponse = yield firebaseServiceResponse(getLikeWithChannelId(uid, channelId));
    const likeResponse = await firebaseServiceResponse(getLikeWithChannelId(uid, channelId));
    if (isNotFound(likeResponse)) {
      // yield likesPostToFirebase.likesNew(channelId, count, uid);
      // return;
      return likesPostToFirebase.likesNew(channelId, count, uid);
    }
    if (!isSuccess(likeResponse)) {
      // yield likeResponse;
      // return;
      return likeResponse;
    }
    const like: TLike = likeResponse.snapshot.val();
    const likeKey: string = Object.keys(like)[0];
    // yield firebaseTxServiceResponse(
      // likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + count),
    // );
    const tx = await firebaseTxServiceResponse(
      likesRef.child(`${uid}/${likeKey}/count`).transaction(c => c + count),
    );
    return tx;
  },
  likesSync: async (channelId: string, count: number, uid: string) => {
    console.log('likesSync');
    const likeResponse = await firebaseServiceResponse(getLikeWithChannelId(uid, channelId));
    if (isNotFound(likeResponse)) {
      return likesPostToFirebase.likesNew(channelId, count, uid);
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
