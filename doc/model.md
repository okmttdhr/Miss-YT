
* `/resource/firebaseId/`は、便宜上配列として表している

```JavaScript
/*
like登録
  channels.likeCountを+1
  likes.userId.likeCountを+1

like削除
  channels.likeCountを-1
  likes.userId.likeCountを-1
*/
```

```JavaScript
/*
マイランキングページ
ref.child('/likes/user_id/').once(data => {
  ref.child(channels/data.channel_id).get();
});
*/
export type likes = {
  userId: [
    {
      id: string;
      channelId: string;
      rank: number;
      likeCount: number;
    }
  ]
}
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
