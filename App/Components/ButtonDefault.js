// @flow
import React, {Component} from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import baseStyles from './ButtonDefault.style';
import {noop} from '../Services/';
import { colors } from '../Themes/';

type TButtonDefault = {
  text: string;
  onPress?: () => any;
  styles?: Object;
  disabled?: boolean;
  icon?: string;
}

export const ButtonDefault = ({styles, onPress, disabled, text, icon}: TButtonDefault) => {
  const s = [
    baseStyles.button,
    disabled && baseStyles.disabled,
    styles,
  ];
  return (
    <TouchableHighlight
      style={s}
      onPress={disabled ? noop : onPress}
      disabled={disabled}
      underlayColor={colors.mainWeak}
    >
      <View style={baseStyles.content}>
        {icon ?
          <Icon
            style={baseStyles.icon}
            name={icon}
            size={20}
            color={'#ffffff'}
          /> : null
        }
        <Text style={baseStyles.buttonText}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

ButtonDefault.defaultProps = {
  onPress: noop,
  styles: {},
  disabled: false,
  icon: '',
};

export default ButtonDefault;
