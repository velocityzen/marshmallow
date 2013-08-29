"use strict";
var inherits = require('util').inherits;
var async = require('async');
var Unit = require('units').Unit;

var Item = function () {
	this.db = null;
};
inherits(Item, Unit);

Item.prototype.unitInit = function (units) {
	this.db = units.require('db');
	this.box = this.db.getBox('menu');
};

Item.prototype.parseSlug = function(slug) {
	return slug.split('.');
};

Item.prototype.get = function(slug, cb) {
	var self = this;

	this.db.getConnection(function(conn) {
		self.box.get(slug).run(conn, cb);
	}, cb);
};

Item.prototype.add = function (item, cb) {
	var self = this;

	this.db.getConnection(function(conn) {
		self.box.insert(item).run(conn, cb);
	}, cb);
};

Item.prototype.update = function (slug, to, cb) {
	var self = this;
	this.db.getConnection(function(conn) {
		self.box
			.get(slug)
			.update(to)
			.run(conn, cb);
	}, cb);
};

Item.prototype.remove = function (slug, cb) {
	var self = this;

	this.db.getConnection(function(conn) {
		self.box
			.get(slug)
			.delete()
			.run(conn, cb);
	}, cb);
};


module.exports = Item;
