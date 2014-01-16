var v = require('../validators');

var ItemCreate = v.basedOn(v.TreeItem, {
	slug: v.path
});

var ItemUp = v.or(
	{ slug: v.slug },
	{ link: v.str },
	{ order: [v.slug] },
	{ title: v.opt(v.str) }
);

var ItemUpdate = {
	slug: v.path,
	to: ItemUp
};

var ItemDel = {slug: v.path};

module.exports = {
	create: ItemCreate,
	update: ItemUpdate,
	del: ItemDel
};
