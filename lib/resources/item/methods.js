var v = require('../validators');

var ItemCreate = v.basedOn(v.TreeItem, {
	slug: v.dotSlug
});

var ItemUp = v.or(
	{ slug: v.slug },
	{ link: v.str },
	{ order: [v.slug] },
	{ title: v.oneOfTrans }
);

var ItemUpdate = {
	slug: v.dotSlug,
	to: ItemUp
};

var ItemDel = {slug: v.dotSlug};

module.exports = {
	create: ItemCreate,
	update: ItemUpdate,
	del: ItemDel
};
