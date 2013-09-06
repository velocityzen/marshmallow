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

Tree.prototype.unitInit = function (units) {
	var cache = units.get('core.cache').cache('trees');
	this.cache = new Uch(cache);
	this.db = units.require('db');
	this.box = this.db.getBox('trees');
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

	return result.join('.');
};

Tree.prototype.get = function(slug, cb) {
	var self = this;

	this.cache.check(slug, cb, function() {
		self.db.getConnection(function(conn) {
			self.box
				.getAll(slug, {index: "slug"})
				.get(0)
				.run(conn, self.cache.add(slug, cb));
		}, cb);
	});
};

Tree.prototype.create = function (tree, cb) {
	var self = this;

	this.db.getConnection(function(conn) {
		self.box
			.insert(tree)
			.run(conn, cb);
	}, cb);
};

Tree.prototype.createItem = function (path, data, cb) {
	var rd = this.db.getRequest({
		create: path,
		data: data
	});

	this.updateHandler(rd.slug, rd.request, cb);
};

Tree.prototype.update = function (slug, to, cb) {
	this.updateHandler(slug, to, cb);
};

Tree.prototype.updateItem = function (path, data, cb) {
	var rd = this.db.getRequest({
		update: path,
		data: data
	});
	this.updateHandler(rd.slug, rd.request, cb);
};

Tree.prototype.updateHandler = function(slug, update, cb) {
	var self = this;

	this.db.getConnection(function(conn) {
		self.box
			.getAll(slug, {index: "slug"})
			.update(update)
			.run(conn,
				self.cache.remove(slug, cb)
			);
	}, cb);
};

Tree.prototype.renameItem = function(path, newName, cb) {
	var self = this,
		rd = this.db.getRequest({
			rename: path,
			data: newName
		});

	this.db.getConnection(function(conn) {
		self.box
			.getAll(rd.slug, {index: "slug"})
			.replace(
				self.db.r.row
					.without(rd.request)
					.merge(rd.rename)
			)
			.run(conn,
				self.cache.remove(rd.slug, cb)
			);
	}, cb);
};

Tree.prototype.remove = function (slug, cb) {
	var self = this;

	this.db.getConnection(function(conn) {
		self.box
			.getAll(slug, {index: "slug"})
			.delete()
			.run(conn, self.cache.remove(slug, cb));
	}, cb);
};

Tree.prototype.removeItem = function (path, cb) {
	var self = this,
		rd = this.db.getRequest({ remove: path });

	this.db.getConnection(function(conn) {
		self.box
			.getAll(rd.slug, {index: "slug"})
			.replace(self.db.r.row.without(rd.request))
			.run(conn,
				self.cache.remove(rd.slug, cb)
			);
	}, cb);
};


module.exports = Tree;
