// @flow
import type {TChannelStore} from '../channel';
import type {TVideo} from '../video';

export type TDefaultChannelVideos = {
  videos: Array<TVideo>,
  isFetchingVideos: boolean;
  errorMessageVideos: string;
  contentHeightVideos: number;
  nextPageTokenVideos: string;
}

export type TDefaultChannelMyInfo = {
  itemMyInfo: {
    rank: number;
    likeCount: number;
  };
  isFetchingMyInfo: boolean;
  errorMessageMyInfo: string;
}

export type TDefaultChannel = TDefaultChannelVideos & TDefaultChannelMyInfo & {
  item: TChannelStore,
  isFetching: boolean,
  errorMessage: string,
}

export type TChannelVideosGetActions = {
  youtubeChannelId: string;
}

export type TChannelMyInfoGetAction = {
  channelId: string;
}

export type TChannelVideosActions = {
  channelVideosGetRequest: (youtubeChannelId: string) => void;
  channelVideosGetSuccess: (videos: [], nextPageTokenVideos: string) => void;
  channelVideosGetFailure: (errorMessageVideos: string) => void;
}

export type TChannelMyInfoActions = {
  channelMyInfoGetRequest: (channelId: string) => void;
  channelMyInfoGetSuccess: (itemMyInfo: {rank: number, likeCount: number}) => void;
  channelMyInfoGetFailure: (errorMessageMyInfo: string) => void;
}

export type TChannelActions = TChannelVideosActions & TChannelMyInfoActions & {
  channelSelect: (item: TChannelStore) => void,
  channelLikesPostIncrease: () => void,
}
