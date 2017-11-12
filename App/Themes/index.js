// @flow
import Fonts, {fontSize} from './Fonts';
import Images from './Images';
import {metrics} from './metrics';
import {colors} from './colors';

export const HEADER_HEIGHT = 66;
export const FOOTER_HEIGHT = 52;

export const flexRowCenter = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
};

export const flexColumnCenter = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
};

export const errorMessage = {
  marginTop: metrics.doubleBaseMargin,
  fontSize: fontSize.small,
  color: colors.error,
};

export * from './applicationStyles';
export * from './Fonts';
export * from './metrics';
export * from './colors';

export { Fonts, Images };
