// @flow
import { Dimensions } from 'react-native'

export const viewportWidth = (percentageWidth: number) => {
  return Dimensions.get('window').width * (percentageWidth / 100)
}

export const flexRowCenter = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center'
}
