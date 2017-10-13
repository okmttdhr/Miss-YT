// @flow
import React from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import { chunk, orderBy } from 'lodash';

import styles from './style';
import type {TChannelStore} from '../../types/Channel';
import type {TDefaultChannels} from '../../types/Redux/channels';
import {Panel} from './Panel';
import {Loading} from '../Loading/';

type TChannelPanels = {
  channels: TDefaultChannels,
  setContentHeight: (height: number) => void,
  channelsRequest: () => void,
  likesPostRequest: (channel: TChannelStore) => void,
}

const onScroll = (event, contentHeight, channelsRequest) => {
  const windowScroll = Dimensions.get('window').height + event.nativeEvent.contentOffset.y;
  if (windowScroll > contentHeight) {
    channelsRequest();
  }
};

const getPanels = (items, likesPostRequest) => {
  return items.map((item, i) => {
    const isSingle = items.length === 1;
    if (isSingle) {
      return null;
    }
    const isEven = (i + 1) % 2 === 0;
    return (
      <Panel
        key={item.id}
        channel={item}
        isMargin={isEven}
        likesPostRequest={likesPostRequest}
      />
    );
  });
};

export const ChannelPanels = (
  {channels, setContentHeight, channelsRequest, likesPostRequest}: TChannelPanels,
) => {
  const {items, contentHeight, isFetching, errorMessage} = channels;
  const channelsItem = orderBy(Object.values(items), ['rank'], ['asc']);
  return (
    <View style={styles.channelPanels}>
      <ScrollView
        onScroll={e => onScroll(e, contentHeight, channelsRequest)}
        scrollEventThrottle={200}
        onContentSizeChange={(width, height) => setContentHeight(height)}
        style={styles.scrollView}
      >
        {channelsItem.length > 0
          ? chunk(channelsItem, 2).map((chunkedItems: TChannelStore[]) => {
            const panels = getPanels(chunkedItems, likesPostRequest);
            return (<View style={styles.panelWrapper} key={chunkedItems[0].id}>{panels}</View>);
          }) : null}
        {errorMessage ?
          <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        {!isFetching && !errorMessage && channelsItem.length === 0 ?
          <Text style={styles.errorMessage}>データがありません</Text> : null}
        <Loading isShow={isFetching} />
      </ScrollView>
    </View>
  );
};
