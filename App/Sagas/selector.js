// @flow
import type {TRootState} from '../types/';

export const uidSelector = (state: TRootState) => state.user.item.uid;
