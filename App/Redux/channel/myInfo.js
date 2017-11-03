// @flow
import type {TDefaultChannelMyInfo} from '../../types/';
import {CHANNEL_MY_INFO} from '../../constants';

/* ------------- Types and Action Creators ------------- */

export const channelMyInfoActions = {
  channelMyInfoGetRequest: ['channelId'],
  channelMyInfoGetSuccess: ['itemMyInfo'],
  channelMyInfoGetFailure: ['errorMessageMyInfo'],
};

/* ------------- Initial State ------------- */

const defaultItem = {
  rank: 0,
  likeCount: 0,
};

export const defaultChannelMyInfo: TDefaultChannelMyInfo = {
  itemMyInfo: defaultItem,
  isFetchingMyInfo: false,
  errorMessageMyInfo: '',
};

/* ------------- Reducers ------------- */

export const channelMyInfoReducer = {
  [CHANNEL_MY_INFO.GET.REQUEST]: (state) => {
    return state.merge({
      isFetchingMyInfo: true,
      errorMessageMyInfo: '',
    });
  },
  [CHANNEL_MY_INFO.GET.SUCCESS]: (state, {itemMyInfo}) => {
    return state.merge({
      itemMyInfo,
      isFetchingMyInfo: false,
      errorMessageMyInfo: '',
    });
  },
  [CHANNEL_MY_INFO.GET.FAILURE]: (state, {errorMessageMyInfo}: {errorMessageMyInfo: string}) => {
    return state.merge({
      isFetchingMyInfo: false,
      errorMessageMyInfo,
    });
  },
};
