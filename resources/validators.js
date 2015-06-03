"use strict";
let valid = require("sweets-valid");
let v = valid.validators;
let opt = v.opt;

//Tree Item
let TreeItemRef = v.wrapper();

let TreeItem = {
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
	slug: v.slug,
	path: v.path,
	TreeItem: TreeItem,
	dict: v.dict,
	basedOn: valid.basedOn
};
