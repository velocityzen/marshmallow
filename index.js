'use strict';
const tree = require('./resources/tree/units');
const Tags = require('./tags');

module.exports = {
  tree,
  'tree.tags': new Tags()
};
