"use strict";
var inherits = require('util').inherits;
var inspect = require('util').inspect;
var Unit = require('units').Unit;
var Uch = require('uch');

var Tree = function () {
	this.db = null;
	this.cache = null;
	this.box = "trees";
};
inherits(Tree, Unit);

Tree.prototype.unitInit = function (units) {
	var cache = units.get('core.cache').cache(this.box);
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
	var path = this.db.getPath(item.slug, 'items');
	delete item.slug;
	this.db.insert(this.box, path, item, cb);
};

Tree.prototype.updateItem = function (item, data, cb) {
	var path = this.db.getPath(item, 'items');
	this.db.update(this.box, path, data, this.cache.remove(path[0], cb));
};

Tree.prototype.renameItem = function(item, newName, cb) {
	var path = this.db.getPath(item, 'items');
	this.db.rename(this.box, path, newName, this.cache.remove(path[0], cb));
};

Tree.prototype.removeItem = function (item, cb) {
	var path = this.db.getPath(item, 'items');
	this.db.remove(this.box, path, this.cache.remove(path[0], cb));
};


module.exports = Tree;
