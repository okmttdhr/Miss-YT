// @flow
import type {TChannelActions, TChannelStore} from '../../../App/types/';

export const channelActionsMock: TChannelActions = {
  channelSelect: (item: TChannelStore) => {}, // eslint-disable-line
  channelLikesPostIncrease: () => {}, // eslint-disable-line
  channelMyInfoGetRequest: (channelId: string) => {}, // eslint-disable-line
  channelMyInfoGetSuccess: (itemMyInfo: {rank: number, likeCount: number}) => {}, // eslint-disable-line
  channelMyInfoGetFailure: (errorMessageMyInfo: string) => {}, // eslint-disable-line
  channelVideosGetRequest: (youtubeChannelId: string) => {}, // eslint-disable-line
  channelVideosGetSuccess: (videos: [], nextPageTokenVideos: string) => {}, // eslint-disable-line
  channelVideosGetFailure: (errorMessageVideos: string) => {}, // eslint-disable-line
};
