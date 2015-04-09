"use strict";
let Uch = require("uch");

let Tree = function () {
	this.db = null;
	this.cache = null;
};

Tree.prototype.box = "trees";
Tree.prototype.scheme = { indexes: ["slug"] };

Tree.prototype.unitInit = function (units) {
	let cache = units.get("core.cache");

	if(cache) {
		cache = cache.cache(this.box);
	}

	this.cache = new Uch(cache);
	this.db = units.require("db");
};

Tree.prototype.get = function(slug, cb) {
	let self = this;

	this.cache.check(slug, cb, function() {
		self.db.getSlug(self.box, slug, self.cache.add(slug, cb));
	});
};

Tree.prototype.create = function (tree, cb) {
	this.db.insert(this.box, tree, cb);
};

Tree.prototype.update = function (slug, to, cb) {
	this.db.updateSlug(this.box, slug, to, this.cache.remove(slug, cb));
};

Tree.prototype.remove = function (slug, cb) {
	this.db.removeSlug(this.box, slug, this.cache.remove(slug, cb));
};

Tree.prototype.createItem = function (item, cb) {
	let self = this,
		r = this.db.r,
		path = this.db.getPath(item.slug, "items"),
		treeId = path[0],
		itemId = path[2];

	delete item.slug;
	this.db.insert(this.box, path, item, function(err) {
		if (err) {
			cb(err, null);
		} else {
			r.table(self.box)
				.getAll(treeId, {index: "slug"})
				.replace(function(row) {
					return row.merge({order: row("order").append(itemId)});
				})
				.run()
				.catch(cb)
				.then(function(res) {
					// self.cache.remove(treeId, cb);
					cb(null, res);
				});
		}
	});
};

Tree.prototype.updateItem = function (item, data, cb) {
	let path = this.db.getPath(item, "items"),
		treeId = path[0];
	this.db.updateSlug(this.box, path, data, this.cache.remove(treeId, cb));
};

Tree.prototype.renameItem = function(item, newName, cb) {
	let self = this,
		path = this.db.getPath(item, "items"),
		treeId = path[0],
		itemId = path[2];

	this.db.renameSlug(this.box, path, newName, function(err) {
		if (err) {
			cb(err, null);
		} else {
			self.db.query({
				box: self.box,
				get: treeId,
				index: "slug"
			},
			[{
				replace: function(row) {
					let index = row("order").indexesOf(itemId).nth(0);
					return row.merge({order: row("order").changeAt(index, newName)});
				}
			}], self.cache.remove(treeId, cb));
		}
	});
};

Tree.prototype.removeItem = function (item, cb) {
	let self = this,
		path = this.db.getPath(item, "items"),
		treeId = path[0],
		itemId = path[2];

	this.db.removeSlug(this.box, path, function(err) {
		if (err) {
			cb(err, null);
		} else {
			self.db.query({
				box: self.box,
				get: treeId,
				index: "slug"
			},
			[{
				replace: function(row) {
					return row.merge({order: row("order").setDifference([itemId])});
				}
			}], self.cache.remove(treeId, cb));
		}
	});
};


module.exports = Tree;
