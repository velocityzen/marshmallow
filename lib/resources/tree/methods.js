var v = require('../validators');

var TreeGet = {
	slug: v.slug
};

var TreeUp = v.or(
	{ slug: v.opt(v.slug) },
	{ order: v.opt([v.slug]) }
);

var TreeUpdate = {
	slug: v.slug,
	to: TreeUp
};

var TreeDel = TreeGet;

module.exports = {
	get: TreeGet,
	create: v.TreeCreate,
	update: TreeUpdate,
	del: TreeDel
};
