"use strict";
// let Uch = require("uch");

let Tree = function () {
	this.db = null;
	this.cache = null;
};

Tree.prototype.box = "trees";
Tree.prototype.scheme = { indexes: ["slug"] };

Tree.prototype.unitInit = function (units) {
	/*let cache = units.get("core.cache");

	if(cache) {
		cache = cache.cache(this.box);
	}

	this.cache = new Uch(cache);*/
	this.db = units.require("db");
};

Tree.prototype.get = function(slug, cb) {
	let self = this;
	self.db.getSlug(self.box, slug, {without: "id"}, cb);
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
	let db = this.db;
	let path = item.id.split("/");
	let treeId = path.shift();
	let itemId = path.pop();

	delete item.id;

	let q = db.table(this.box).getAll(treeId, {index: "slug"});

	q = db.updateOnPath(q, path, function(row) {
		let itemMerge = {};
		itemMerge[itemId] = item;
		return {
			order: row("order").prepend(itemId),
			items: row("items").merge(itemMerge)
		};
	});

	db.run(q, cb);
};

Tree.prototype.updateItem = function (item, data, cb) {
	let db = this.db;
	let path = db.getPath(item, "items");
	let treeId = path.shift();

	let q = db.r.table(this.box).getAll(treeId, {index: "slug"});

	q = db.updateOnPath(q, path, function() {
		return data;
	});

	db.run(q, cb);
};

Tree.prototype.renameItem = function(item, newName, cb) {
	let db = this.db;
	let path = db.getPath(item, "items");
	let treeId = path.shift();
	let itemId = path.pop();

	let q = db.r.table(this.box).getAll(treeId, {index: "slug"});

	q = db.updateOnPath(q, path, function(row) {
		let index = row("order").indexesOf(itemId).nth(0);
		let itemMerge = {};
		itemMerge[newName] = row("items")(itemId);
		return {
			items: db.r.literal( row("items").merge(itemMerge).without(itemId) ),
			order: row("order").changeAt(index, newName)
		};
	});

	db.run(q, cb);
};

Tree.prototype.removeItem = function (item, cb) {
	let db = this.db;
	let path = this.db.getPath(item, "items");
	let treeId = path.shift();
	let itemId = path.pop();

	let q = db.table(this.box).getAll(treeId, {index: "slug"});

	q = db.updateOnPath(q, path, function(row) {
		return {
			items: db.r.literal( row("items").without(itemId) ),
			order: row("order").setDifference( [itemId] )
		};
	});

	db.run(q, cb);
};


module.exports = Tree;
