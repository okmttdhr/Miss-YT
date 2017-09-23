// @flow
import {likesRef} from './ref';

export const getLikeWithChannelId = (uid: string, channelId: string) => {
  return likesRef.child(uid).orderByChild('channelId').equalTo(channelId).once('value');
};
