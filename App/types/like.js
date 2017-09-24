// @flow
export type TLike = {
  channelId: string;
  rank: number;
  count: number;
}

export type TLikeWithKey = {[key: string]: TLike};
