// @flow
import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import baseStyles from './Styles/FullButtonStyle';
import {noop} from '../Services/';

type TFullButton = {
  text: string;
  onPress?: () => void;
  styles?: Object;
  disabled?: boolean;
}

export const FullButton = ({styles, onPress, disabled, text}: TFullButton) => {
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
    >
      <Text style={baseStyles.buttonText}>{text}</Text>
    </TouchableHighlight>
  );
};

FullButton.defaultProps = {
  onPress: noop,
  styles: {},
  disabled: false,
};

export default FullButton;
