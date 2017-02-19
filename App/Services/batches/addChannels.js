// @flow
import {ChannelsResource, channelsRef} from '../index'

// add CHANNEL_IDS before dispatching batch
const CHANNEL_IDS = 'UC2rbyOa3Jo7vGSibqKcRjqw, UCI5qMix97T3tVZfxmHObDjA, UC0elp2101KAxbaAMzInGerA'

const addToFirebase = (channels) => {
  channels.forEach((item, index) => {
    console.log(`${item.snippet.title} was pushed`)
    channelsRef.push({
      rank: 0,
      likeCount: 0,
      status: 'inactive',
      youtube: {
        id: item.id,
        name: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        banner: item.brandingSettings.image.bannerMobileImageUrl,
        subscriberCount: item.statistics.subscriberCount,
        viewCount: item.statistics.viewCount
      }
    })
  })
}

export const addChannels = () => {
  const channelsResource = new ChannelsResource()
  channelsResource.get(CHANNEL_IDS)
    .then(res => addToFirebase(res.data.items))
    .then(() => console.log('addChannels: batch finished-----------------------------'))
    .catch(() => console.log('addChannels: batch failed-----------------------------'))
}
