"use strict";
var inherits = require('util').inherits;
var async = require('async');
var Unit = require('units').Unit;

var v = require('../validators');
var dbErrHandler = require('sweets-nougat').dbErrHandler;

var Item = function () {};
inherits(Item, Unit);

Item.prototype.name = 'menu/item';

Item.prototype.method = {
	get: {
		slug: v.slug
	},

	create: {
		slug: v.slug,
		title: v.str,
		order: v.opt(v.arr()),
		items: v.opt(v.any),
	},

	update: {
		slug: v.slug,
		to: {
			slug: v.slug,
			title: v.str,
			items: v.opt(v.arr())
		}
	},

	del: {
		slug: v.slug
	}
};

Item.prototype.unitInit = function (units) {
	this.ctrl = units.require('resources.menu.item.controller');
};

Item.prototype.get = function (auth, item, cb) {
	this.ctrl.get(item.slug, cb);
};

Item.prototype.create = function (auth, item, cb) {
	this.ctrl.create(item, cb);
};

Item.prototype.update = function (auth, item, cb) {
	this.ctrl.update(item.slug, item.to, cb);
};

Item.prototype.del = function (auth, item, cb) {
	this.ctrl.remove(item.slug, cb);
};


module.exports = Item;
