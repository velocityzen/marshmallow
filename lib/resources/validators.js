"use strict";
var valid = require('valid');
var v = valid.validators;
var opt = v.opt;

var oneOrMany = function(obj) {
	return v.v(obj, v.len(1));
};

var slug = v.rx(/^[-a-z0-9_]{1,60}$/);
var dotSlug = v.rx(/^[-\.a-z0-9_]{1,60}$/);

var tranStr = {
	en: v.str,
	ru: v.str
};

var oneOfTrans = {
	en: opt(v.str),
	ru: opt(v.str)
};

//Tree Item
var TreeItemRef = v.wrapper();

var TreeItem = {
		title: tranStr,
		link: opt(v.str),
		order: opt([slug]),
		items: opt(v.dict(slug, TreeItemRef))
};

TreeItemRef.validator = TreeItem;

// Tree
var TreeCreate = {
	slug: slug,
	order: [slug],
	items: v.dict(slug, TreeItem)
};


module.exports = {
	or: v.or,
	str: v.str,
	opt: opt,
	basedOn: valid.basedOn,
	oneOfTrans: oneOfTrans,
	slug: slug,
	dotSlug: dotSlug,
	oneOrMany: oneOrMany,
	TreeCreate: TreeCreate,
	TreeItem: TreeItem
};
