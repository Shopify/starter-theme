/* eslint-disable no-undef */

const path = require('path');

const alias = {
  jquery: path.resolve('./node_modules/jquery'),
  'lodash-es': path.resolve('./node_modules/lodash-es'),
};

module.exports = {
  slateCssVarLoader: {
    cssVarLoaderLiquidPath: ['src/snippets/css-variables.liquid'],
  },
  slateTools: {
    extends: {
      dev: {resolve: {alias}},
      prod: {resolve: {alias}},
    },
  },
};
