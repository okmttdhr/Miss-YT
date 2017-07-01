// @flow

const type = {
  base: 'HelveticaNeue',
  bold: 'HelveticaNeue-Bold',
  emphasis: 'HelveticaNeue-Italic',
};

export const fontSize = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5,
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: fontSize.h1,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: fontSize.h2,
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: fontSize.h3,
  },
  h4: {
    fontFamily: type.base,
    fontSize: fontSize.h4,
  },
  h5: {
    fontFamily: type.base,
    fontSize: fontSize.h5,
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: fontSize.h6,
  },
  normal: {
    fontFamily: type.base,
    fontSize: fontSize.regular,
  },
  description: {
    fontFamily: type.base,
    fontSize: fontSize.medium,
  },
};

export default {
  type,
  size: fontSize,
  style,
};
