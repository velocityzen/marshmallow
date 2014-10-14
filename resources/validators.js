"use strict";
var valid = require('sweets-valid');
var v = valid.validators;
var opt = v.opt;

var oneOrMany = function(obj) {
	return v.v(obj, v.len(1));
};

//Tree Item
var TreeItemRef = v.wrapper();

var TreeItem = {
	title: v.str,
	link: opt(v.str),
	order: opt([v.slug]),
	items: opt(v.dict(v.slug, TreeItemRef))
};

TreeItemRef.validator = v.spec(TreeItem);

module.exports = {
	or: v.or,
	str: v.str,
	opt: opt,
	basedOn: valid.basedOn,
	slug: v.slug,
	path: v.path,
	oneOrMany: oneOrMany,
	TreeItem: TreeItem,
	dict: v.dict,
	wrapper: v.wrapper,
	spec: v.spec
};
