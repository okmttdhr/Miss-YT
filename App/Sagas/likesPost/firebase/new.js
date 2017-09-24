// @flow
import {
  handleServerError,
  likesRef,
} from '../../../Services/';

export const _new = async (channelId: string, count: number, uid: string) => {
  const promise = await handleServerError(
    likesRef.child(uid)
      .push({channelId, rank: 0, count})
      .then(() => {
        return {status: 200, message: '', snapshot: null};
      }),
  );
  return promise;
};
