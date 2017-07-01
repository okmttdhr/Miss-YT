// @flow
import { Dimensions } from 'react-native';

export const viewportWidth = (percentageWidth: number) => Dimensions.get('window').width * (percentageWidth / 100);
export const viewportHeight = (percentageHeight: number) => Dimensions.get('window').height * (percentageHeight / 100);
