// @flow
import type {TRootState} from '../types/';

export const uidSelector = (state: TRootState) => state.user.item.uid;
export const likedChannelsSelector = (state: TRootState) => state.likedChannels.items;
