// @flow
import {firebaseServiceResponse} from '../index';
import {likesRef} from './ref';

export const getLikeWithChannelId = (uid: string, channelId: string) => {
  return firebaseServiceResponse(
    likesRef.child(uid).orderByChild('channelId').equalTo(channelId).once('value'),
  );
};
