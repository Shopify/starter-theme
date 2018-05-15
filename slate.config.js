/* eslint-disable no-undef */

const path = require('path');
const fs = require('fs');
const WrapperPlugin = require('wrapper-webpack-plugin');

const alias = {
  jquery: path.resolve('./node_modules/jquery'),
  'lodash-es': path.resolve('./node_modules/lodash-es'),
};

const liquidVariables = fs.readFileSync(
  'src/snippets/liquid-variables.liquid',
  'utf8',
);

module.exports = {
  slateCssVarLoader: {
    cssVarLoaderLiquidPath: ['src/snippets/css-variables.liquid'],
  },
  slateTools: {
    extends: {
      dev: {resolve: {alias}},
      prod: {
        resolve: {alias},
        module: {},
        plugins: [
          new WrapperPlugin({
            test: /\.css\.liquid$/,
            header: liquidVariables,
          }),
        ],
      },
    },
  },
};
