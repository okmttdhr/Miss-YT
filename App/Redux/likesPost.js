// @flow
import type {TChannelStore} from '../types/';

/* ------------- Types and Action Creators ------------- */

export const likesPostActions = (type: string) => {
  return {
    [`${type}LikesPostRequest`]: ['channel'],
    [`${type}LikesPostIncrease`]: ['item'],
  };
};

/* ------------- Reducers ------------- */

export const likesPostReducer = (TYPE: string) => {
  return {
    [`${TYPE}_LIKES_POST_REQUEST`]: (state: Object, { channel }: {channel: TChannelStore}) => {
      const update = {[channel.id]: {isFetching: true, errorMessage: ''}};
      return state.merge({
        items: update,
      }, {deep: true});
    },
    [`${TYPE}_LIKES_POST_INCREASE`]: (state: Object, { channelId }: Object) => {
      const increasedlikeCount = state.items[channelId].likeCount + 1;
      const update = {[channelId]: {likeCount: increasedlikeCount}};
      return state.merge({
        items: update,
      }, {deep: true});
    },
  };
};
