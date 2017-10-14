// @flow
import React, {Component} from 'react';
import { View, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type TLoading = {
  isShow: boolean;
}

export class Loading extends Component<TLoading, void> {
  constructor() {
    super();
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  }

  props: {
    isShow: boolean
  }

  spinValue: Object;

  spin() {
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
      },
    ).start(() => this.spin());
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-360deg'],
    });
    return (
      <View style={styles.container}>
        {this.props.isShow
          ? <AnimatedIcon
            style={{transform: [{rotate: spin}]}}
            name={'sync'}
            size={40}
            color={'#000'}
          /> : null
        }
      </View>
    );
  }
}
