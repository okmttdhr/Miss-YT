/*
`/resource/firebase_id/`は、便宜上配列として表している
created_atは必要なんだっけ？
priorityってなんだっけ？
*/

/*
paginationは以下のような感じ？
ref.child(channels).orderByChild('rank').startAt(1).limitToFirst(100).get()
ref.child(channels).orderByChild('rank').startAt(101).limitToFirst(100).get()
ref.child(channels).orderByChild('rank').startAt(201).limitToFirst(100).get()
*/

/*
like登録
  channels.like_countを+1
  likes.user_id.countを+1
  user.possible_like_countを-1。0になったらlike不可に。
like削除
  channels.like_countを-1
  likes.user_id.countを-1
  user.possible_like_countを+1。20になったらそれ以上は回復しない。
*/

/*
ランキングページ
リソース名は変更する予定=>channelsでいい。

ランキングページで、自分がlikeしているかどうかの判別
ref.child(channels).get(data => {
  const isLiked = ref.child(likes/user_id/).orderByChild('channel_id').equalTo(data.id).get();
});
*/
export type channels = [
  {
    id: string;
    /* アップデートされて、正当なデータになったオブジェクトのみイテレートする?
    is_filled, is_show, is_competed/has_competed, is_deleted...など? */
    // isUpdated: boolean;
    // =>表示の切り替えをするためのフラグはアンチパターン。
    // =>typeとかで代用する。
    rank: number;
    likeCount: number;
    cseSearchQuery?: string;
    youtube: {
      id: string;
      name: string; // title
      description: string;
      thumbnail: string;
      banner: string; // bannerMobileImageUrl
      subscriberCount: string;
      viewCount: string;
    };
    twitter?: {
      id: string;
      followersCount: number;
    };
  }
]

/*
マイランキングページ
ref.child(likes/user_id).get(data => {
  ref.child(channels/data.channel_id).get();
});
*/
export type likes = {
  user_id: [
    {
      id: string;
      channel_id: string;
      rank: number;
      likeCount: number;
    }
  ]
}

/*
ユーザー
*/
export type users = [
  {
    id: string;
    name: string;
    email: string;
    possibleLikeCount: number;
  }
]

/*
フィードバック
オススメチャンネルを送らせたい。リソース名は要検討
*/
export type feedback = [
  {
    id: string;
    user_id: string;
    message: string;
  }
]
