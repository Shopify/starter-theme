/* eslint-disable no-undef */

const path = require('path');

const alias = {
  jquery: path.resolve('./node_modules/jquery'),
  'lodash-es': path.resolve('./node_modules/lodash-es'),
};

module.exports = {
  extends: {
    dev: {resolve: {alias}},
    prod: {resolve: {alias}},
  },
};
