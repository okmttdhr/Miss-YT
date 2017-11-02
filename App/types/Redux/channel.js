// @flow
import type {TChannelStore} from '../channel';

export type TDefaultChannelMyInfo = {
  itemMyInfo: {
    rank: number;
    likeCount: number;
  };
  isFetchingMyInfo: boolean;
  errorMessageMyInfo: string;
}

export type TDefaultChannel = TDefaultChannelMyInfo & {
  item: TChannelStore,
  isFetching: boolean,
  errorMessage: string,
}

export type TChannelMyInfoGetAction = {
  channelId: string;
}

export type TChannelMyInfoActions = {
  channelMyInfoGetRequest: (channelId: string) => void;
  channelMyInfoGetSuccess: (itemMyInfo: {rank: number, likeCount: number}) => void;
  channelMyInfoGetFailure: (errorMessageMyInfo: string) => void;
}

export type TChannelActions = TChannelMyInfoActions & {
  channelSelect: (item: TChannelStore) => void,
  channelLikesPostIncrease: () => void,
}
