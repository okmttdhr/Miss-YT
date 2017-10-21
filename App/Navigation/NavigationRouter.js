// @flow

import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import {
  ConnectedAccountScreen,
  ConnectedRankingScreen,
  ConnectedMyRankingScreen,
  ConnectedChannelDetailScreen,
} from '../Containers';
import { TabIcon } from '../Components';
import { TabBarStyle } from './Styles';

const NavigationRouter = () => (
  <Router>
    <Scene key="Root">
      <Scene key="Tabbar" tabs initial tabBarStyle={TabBarStyle.container}>
        <Scene key="Ranking" title="Ranking" component={ConnectedRankingScreen} icon={TabIcon} />
        <Scene key="MyRanking" title="My Ranking" component={ConnectedMyRankingScreen} icon={TabIcon} />
        <Scene key="Account" title="Account" component={ConnectedAccountScreen} icon={TabIcon} />
      </Scene>
      <Scene key="ChannelDetail" title="ChannelDetail" component={ConnectedChannelDetailScreen} />
    </Scene>
  </Router>
);

export default NavigationRouter;
