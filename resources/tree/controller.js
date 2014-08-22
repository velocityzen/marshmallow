"use strict";
var inherits = require('util').inherits;
var inspect = require('util').inspect;
var Unit = require('units').Unit;
var Uch = require('uch');

var Tree = function () {
	this.db = null;
	this.cache = null;
};
inherits(Tree, Unit);

Tree.prototype.box = "trees";
Tree.prototype.scheme = { indexes: ["slug"] };

Tree.prototype.unitInit = function (units) {
	var cache = units.get('core.cache');

	if(cache) {
		cache = cache.cache(this.box);
	}

	this.cache = new Uch(cache);
	this.db = units.require('db');
};

// Tree

Tree.prototype.get = function(slug, cb) {
	var self = this;

	this.cache.check(slug, cb, function() {
		self.db.get(self.box, slug, self.cache.add(slug, cb));
	});
};

Tree.prototype.create = function (tree, cb) {
	this.db.insert(this.box, tree, cb);
};

Tree.prototype.update = function (slug, to, cb) {
	this.db.update(this.box, slug, to, this.cache.remove(slug, cb));
};

Tree.prototype.remove = function (slug, cb) {
	this.db.remove(this.box, slug, this.cache.remove(slug, cb));
};

// Tree item
Tree.prototype.createItem = function (item, cb) {
	var self = this,
	 	path = this.db.getPath(item.slug, 'items'),
	 	treeId = path[0],
		itemId = path[2];

	delete item.slug;
	this.db.insert(this.box, path, item, function(err, result) {
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
					return row.merge({order: row("order").append(itemId)});
				}
			}], cb);
		}
	});
};

Tree.prototype.updateItem = function (item, data, cb) {
	var path = this.db.getPath(item, 'items'),
		treeId = path[0];
	this.db.update(this.box, path, data, this.cache.remove(treeId, cb));
};

Tree.prototype.renameItem = function(item, newName, cb) {
	var self = this,
		path = this.db.getPath(item, 'items'),
		treeId = path[0],
		itemId = path[2];

	this.db.rename(this.box, path, newName, this.cache.remove(treeId, function(err, result) {
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
					var index = row("order").indexesOf(itemId).nth(0);
					return row.merge({order: row("order").changeAt(index, newName)});
				}
			}], cb);
		}
	}));
};

Tree.prototype.removeItem = function (item, cb) {
	var self = this,
		path = this.db.getPath(item, 'items'),
		treeId = path[0],
		itemId = path[2];

	this.db.remove(this.box, path, this.cache.remove(treeId, function(err, result) {
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
			}], cb);
		}
	}));
};


module.exports = Tree;
