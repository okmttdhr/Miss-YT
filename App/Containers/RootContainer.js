// @flow

import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import NavigationRouter from '../Navigation/NavigationRouter';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';

import styles from './Styles/RootContainerStyle';

class RootContainer extends Component<any, void> {
  componentDidMount() {
    if (!ReduxPersist.active) {
      this.props.startup();
    }
  }

  props: {
    startup: () => void;
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="dark-content" />
        <NavigationRouter />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(null, mapDispatchToProps)(RootContainer);
