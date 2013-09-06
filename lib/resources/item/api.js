"use strict";
var inherits = require('util').inherits;
var async = require('async');
var Unit = require('units').Unit;
var methods = require('./methods');

var Item = function () {};
inherits(Item, Unit);

Item.prototype.name = 'tree/item';

Item.prototype.method = methods;

Item.prototype.unitInit = function (units) {
	this.ctrl = units.require('tree.controller');
};

Item.prototype.create = function (auth, data, cb) {
	var path = this.ctrl.getPath(data.slug);
	delete data.slug;
	this.ctrl.createItem(path, data, cb);
};

Item.prototype.update = function (auth, data, cb) {
	var path = this.ctrl.getPath(data.slug);
	if(data.to.slug) {
		this.ctrl.renameItem(path, data.to.slug, cb);
	} else {
		this.ctrl.updateItem(path, data.to, cb);
	}
};

Item.prototype.del = function (auth, data, cb) {
	var path = this.ctrl.getPath(data.slug);
	this.ctrl.removeItem(path, cb);
};


module.exports = Item;
