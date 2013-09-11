"use strict";
var inherits = require('util').inherits;
var inspect = require('util').inspect;
var Unit = require('units').Unit;
var Uch = require('uch');

var Tree = function () {
	this.db = null;
	this.cache = null;
	this.boxName = "trees";
};
inherits(Tree, Unit);

Tree.prototype.unitInit = function (units) {
	var cache = units.get('core.cache').cache('trees');
	this.cache = new Uch(cache);
	this.db = units.require('db');
	this.box = this.db.getBox(this.boxName);
};

Tree.prototype.getPath = function(slug) {
	var result = [],
		path = slug.split('.');

	for(var i = 0; i < path.length; i++) {
		if(i!==0) {
			result.push('items');
		}
		result.push(path[i]);
	}

	return {
		root: result[0],
		path: result.join('.')
	};
};

Tree.prototype.get = function(slug, cb) {
	var self = this;

	this.cache.check(slug, cb, function() {
		self.db.get(self.boxName, slug, self.cache.add(slug, cb));
	});
};

Tree.prototype.create = function (tree, cb) {
	this.db.create(this.boxName, tree, cb);
};

Tree.prototype.update = function (slug, to, cb) {
	this.db.update(this.boxName, slug, to, this.cache.remove(slug, cb));
};

Tree.prototype.remove = function (slug, cb) {
	this.db.remove(this.boxName, slug, this.cache.remove(slug, cb));
};

// Tree item

Tree.prototype.createItem = function (item, cb) {
	var path = this.getPath(item.slug);
	delete item.slug;
	this.db.create(this.boxName, path.path, item, cb);
};

Tree.prototype.updateItem = function (item, data, cb) {
	var path = this.getPath(item);
	this.db.update(this.boxName, path.path, data, this.cache.remove(path.root, cb));
};

Tree.prototype.renameItem = function(item, newName, cb) {
	var path = this.getPath(item);
	this.db.rename(this.boxName, path.path, newName, this.cache.remove(path.root, cb));
};

Tree.prototype.removeItem = function (item, cb) {
	var path = this.getPath(item);
	this.db.remove(this.boxName, path.path, this.cache.remove(path.root, cb));
};


module.exports = Tree;
