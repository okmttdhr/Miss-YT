/*
`/resource/firebase_id/`は、便宜上配列として表している
created_atは必要なんだっけ？
priorityってなんだっけ？
*/

/*
paginationは以下のような感じ？
ref.child(youtubers).orderByChild('rank').startAt(1).limitToFirst(100).get()
ref.child(youtubers).orderByChild('rank').startAt(101).limitToFirst(100).get()
ref.child(youtubers).orderByChild('rank').startAt(201).limitToFirst(100).get()
*/

/*
like登録
  youtubers.like_countを+1
  likes.user_id.countを+1
  user.possible_like_countを-1。0になったらlike不可に。
like削除
  youtubers.like_countを-1
  likes.user_id.countを-1
  user.possible_like_countを+1。20になったらそれ以上は回復しない。
*/

/*
ランキングページ
リソース名は変更する予定
youtube_followerとかは、YouTubeのAPIに合わせた名前にする

ランキングページで、自分がlikeしているかどうかの判別
ref.child(youtubers).get(data => {
  const isLiked = ref.child(likes/user_id/).orderByChild('youtuber_id').equalTo(data.id).get();
});
*/
export type youtubers = [
  {
    id: string;
    name: string;
    youtube_summary: string;
    youtube_follower: number;
    twitter_follower: number;
    like_count: number;
    rank: number;
    like_count: number;
  }
]

/*
マイランキングページ
ref.child(likes/user_id).get(data => {
  ref.child(youtubers/data.youtuber_id).get();
});
*/
export type likes = {
  user_id: [
    {
      id: string;
      youtuber_id: string;
      count: number;
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
    possible_like_count: number;
  }
]

/*
フィードバック
オススメYouTuberを送らせたい。リソース名は要検討
*/
export type feedback = [
  {
    id: string;
    user_id: string;
    message: string;
  }
]
