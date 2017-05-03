// @flow
import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { chunk } from 'lodash';

import type {TChannelStore} from '../../types/Channel';
import type {TDefaultChannels} from '../../types/Redux/ChannelsRedux';
import {Panel} from './Panel';
import styles from './style';

type TChannelPanels = {
  channels: TDefaultChannels,
  setContentHeight: (height: number) => void,
}

const onScroll = (event, contentHeight) => {
  console.log(Dimensions.get('window').height + event.nativeEvent.contentOffset.y);
  const windowScroll = Dimensions.get('window').height + event.nativeEvent.contentOffset.y;
  if (windowScroll > contentHeight) {
    console.log('to next page!');
  }
};

const getPanels = (items) => {
  return items.map((item, i) => {
    const isSingle = items.length === 1;
    if (isSingle) {
      return null;
    }
    const isEven = (i + 1) % 2 === 0;
    return (<Panel key={item.id} channel={item} isMargin={isEven} />);
  });
};

export const ChannelPanels = ({channels, setContentHeight}: TChannelPanels) => {
  const {items, contentHeight} = channels;
  const channelsItem = Object.values(items);
  return (
    <View style={styles.channelPanels}>
      <ScrollView
        onScroll={e => onScroll(e, contentHeight)}
        scrollEventThrottle={1}
        onContentSizeChange={(width, height) => setContentHeight(height)}
        style={styles.scrollView}
      >
        {channelsItem.length > 0
          ? chunk(channelsItem, 2).map((chunkedItems: TChannelStore[]) => {
            const panels = getPanels(chunkedItems);
            return (<View style={styles.panelWrapper} key={chunkedItems[0].id}>{panels}</View>);
          }) : null}
      </ScrollView>
    </View>
  );
};
