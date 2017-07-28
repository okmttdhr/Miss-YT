// @flow
import type {TChannelStore} from '../Channel';

export type TDefaultChannels = {
  items: {[key: string]: TChannelStore},
  contentHeight: number,
  isFetching: boolean,
  errorMessage: string,
  startAt: number,
}

export type TChannelsActions = {
  channelsRequest: () => any,
  channelsSuccess: () => any,
  channelsFailure: () => any,
  channelsChanged: () => any,
  channelsRemoved: () => any,
  // TODO channelsだけの型に命名リファクタ
  setContentHeight: (height: number) => void,
}
