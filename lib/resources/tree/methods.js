var v = require('../validators');

var TreeCreate = {
	slug: v.slug,
	order: [v.slug],
	items: v.dict(v.slug, v.TreeItem)
};

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
	create: TreeCreate,
	update: TreeUpdate,
	del: TreeDel
};
