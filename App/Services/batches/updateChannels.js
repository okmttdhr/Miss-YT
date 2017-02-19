// @flow
// -------------大まかな流れ----------------
// 1.チャンネル登録者数とフォロワーを取得、更新
// 2.更新した数値から`score`を作成
// 3.`score`をorderに指定してデータを取得、indexをrankとして保存
import {toString} from 'lodash'
import {ChannelsResource, channelsRef} from '../index'

const LIMIT = 100

// 100個の`CHANNEL_IDS``SCREEN_NAME`を配列に保持
const accumulateIds = (snapshot) => {
  const channelIds = []
  snapshot.forEach((channel) => {
    const c = channel.val()
    channelIds.push(c.youtube.id)
  })
  return {channelIds}
}

const toParameter = (ids) => {
  return {
    channelIds: toString(ids.channelIds)
  }
}

// まとめてリクエストパラメーターとして投げる
// =>リクエストは1回で済む
// =>返ってくる順番はバラバラ
const getLatestItem = (channelIds, screenNames) => {
  const channelsResource = new ChannelsResource()
  // Twitterのレスポンスも含めた`{channels: item, twitter, item}`というようなオブジェクトに変更できる設計で返している
  return channelsResource.get(channelIds).then((res) => ({channels: res.data.items}))
}

// 100件のレスポンスを回しながら、該当するFirebaseのデータをアップデートしてゆく
// =>100件の検索と更新くらいならFirebaseはやられない。
// =>もしかしたら時間はかかるかもしれないが、それはbatchなので問題なし。
const updateOnFirebase = (channels) => {
  channels.forEach((channel) => {
    // =>CHANNEL_IDが該当すればチャンネル登録者数を更新
    channelsRef.orderByChild('youtube/id').equalTo(channel.id).once('value', (snapshot) => {
      snapshot.forEach((s) => channelsRef.update({[`/${s.key}/youtube/subscriberCount`]: channel.statistics.subscriberCount}))
    })
  })
}

// 100件Firebaseからデータを取得
// =>TW APIで、まとめて投げれるのが100件までだから。
export const updateChannels = () => {
  channelsRef.limitToFirst(LIMIT).once('value')
    .then((snapshot) => accumulateIds(snapshot))
    .then((ids: {channelIds: string[]}) => toParameter(ids))
    .then((parameters: {channelIds: string}) => getLatestItem(parameters.channelIds))
    .then((response: {channels: Object[]}) => updateOnFirebase(response.channels))
    .catch((error) => console.log(error))
}
