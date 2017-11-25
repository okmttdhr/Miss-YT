// @flow
import {range} from 'lodash';
import type {TVideo} from '../../App/types/';

export const videoMock = (i: number = 0): TVideo => {
  return {
    videoId: `VIDEOID${i}`,
    channelId: `CHANNELID${i}`,
    title: `TITLE${i}`,
    thumbnail: `THUMBNAIL${i}`,
  };
};

export const videosMock = range(10).map((i) => {
  return videoMock(i);
});
