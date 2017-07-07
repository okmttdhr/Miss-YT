// @flow
import React from 'react';
import { TouchableHighlight, Text } from 'react-native';

import baseStyles from './ButtonDefault.style';
import {noop} from '../Services/';
import { colors } from '../Themes/';

type TButtonDefault = {
  text: string;
  onPress?: () => any;
  styles?: Object;
  disabled?: boolean;
}

export const ButtonDefault = ({styles, onPress, disabled, text}: TButtonDefault) => {
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
      <Text style={baseStyles.buttonText}>{text}</Text>
    </TouchableHighlight>
  );
};

ButtonDefault.defaultProps = {
  onPress: noop,
  styles: {},
  disabled: false,
};

export default ButtonDefault;
