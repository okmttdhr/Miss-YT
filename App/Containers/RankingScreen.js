// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View } from 'react-native'

import type {TDefaultChannels, TChannelsActions} from '../types/Redux/ChannelsRedux'

import styles from './Styles/RankingScreenStyle'
import {channelsActions} from '../Redux/ChannelsRedux'

type IRankingScreen = {
  title: string,
  channels: TDefaultChannels,
  channelsActions: TChannelsActions
}

export class RankingScreen extends React.Component {
  props: IRankingScreen
  componentDidMount () {
    this.props.channelsActions.channelsRequest()
  }
  render () {
    const items = Object.values(this.props.channels.items)
    return (
      <View style={[styles.container]}>
        {items.length > 0 ? items.map((item: any, index: number) => {
          return (<Text key={index}>{item.youtube.name}</Text>)
        }) : null}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    channelsActions: bindActionCreators(channelsActions, dispatch)
  }
}

export const ConnectedRankingScreen = connect(mapStateToProps, mapDispatchToProps)(RankingScreen)
