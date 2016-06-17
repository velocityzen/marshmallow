'use strict';

const slugPattern = '^[-a-z0-9_]{1,60}$';
const slug = function() {
  return {
    type: 'string',
    pattern: slugPattern
  }
};

const pathPattern = '^[-a-z0-9_\/]{1,200}$';
const path = function() {
  return {
    type: 'string',
    pattern: pathPattern
  }
};

const title = function() {
  return {
    type: 'string',
    maxLength: 140
  }
};

const item = function() {
  return {
    type: 'object',
    additionalProperties: false,
    required: [ 'title' ],
    properties: {
      title: title(),
      href: {
        type: 'string'
      }
    }
  }
};

module.exports = { slugPattern, slug, pathPattern, path, title, item };

/*//Tree Item
let TreeItemRef = v.wrapper();

let TreeItem = {
	title: v.str,
	href: opt(v.str),
	order: opt([v.slug]),
	items: opt(v.dict(v.slug, TreeItemRef))
};

TreeItemRef.validator = v.spec(TreeItem);*/
