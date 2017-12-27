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
        <Scene key="Ranking" title="ランキング" hideNavBar component={ConnectedRankingScreen} icon={TabIcon} />
        <Scene key="MyRanking" title="マイランキング" hideNavBar component={ConnectedMyRankingScreen} icon={TabIcon} />
        <Scene key="Account" title="アカウント" hideNavBar component={ConnectedAccountScreen} icon={TabIcon} />
      </Scene>
      <Scene key="ChannelDetail" title="チャンネル詳細" navigationBarStyle={TabBarStyle.navigationBarStyle} component={ConnectedChannelDetailScreen} />
    </Scene>
  </Router>
);

export default NavigationRouter;
