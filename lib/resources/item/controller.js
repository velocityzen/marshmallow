"use strict";
var inherits = require('util').inherits;
var async = require('async');
var Unit = require('units').Unit;
var Uch = require('uch');

var Item = function () {
	this.db = null;
	this.cache = null;
};
inherits(Item, Unit);

Item.prototype.unitInit = function (units) {
	var cache = units.get('core.cache');
	var c = cache ? cache.getCache('menu') : false;
	this.cache = new Uch(c);
	this.db = units.require('db');
	this.box = this.db.getBox('menu');
};

Item.prototype.parseSlug = function(slug) {
	return slug.split('.');
};

Item.prototype.get = function(slug, cb) {
	var self = this;

	this.cache.check(slug, cb, function() {
		self.db.getConnection(function(conn) {
			self.box
				.get(slug)
				.run(conn, self.cache.add(slug, cb));
		}, cb);
	});
};

Item.prototype.create = function (item, cb) {
	var self = this;

	this.db.getConnection(function(conn) {
		self.box
			.insert(item)
			.run(conn, self.cache.add(item.slug, cb));
	}, cb);
};

Item.prototype.update = function (slug, to, cb) {
	var self = this;
	this.db.getConnection(function(conn) {
		self.box
			.get(slug)
			.update(to)
			.run(conn, self.cache.remove(slug, cb));
	}, cb);
};

Item.prototype.remove = function (slug, cb) {
	var self = this;

	this.db.getConnection(function(conn) {
		self.box
			.get(slug)
			.delete()
			.run(conn, self.cache.remove(slug, cb));
	}, cb);
};


module.exports = Item;
