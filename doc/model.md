
* `/resource/firebase_id/`は、便宜上配列として表している

```JavaScript
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
```

```JavaScript
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
```

```JavaScript
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
```

```JavaScript
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
```
