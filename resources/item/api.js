"use strict";
var inherits = require('util').inherits;
var returnHandler = require('apis-return').handler;
var Unit = require('units').Unit;

var Item = function () {};
inherits(Item, Unit);

Item.prototype.resource = 'tree/item';

Item.prototype.unitInit = function (units) {
	this.ctrl = units.require('tree.controller');
};

Item.prototype.create = function (auth, data, cb) {
	this.ctrl.createItem(data, returnHandler("BadRequest", cb));
};

Item.prototype.update = function (auth, data, cb) {
	if(data.to.slug) {
		this.ctrl.renameItem(data.id, data.to.slug, returnHandler("BadRequest", cb));
	} else {
		this.ctrl.updateItem(data.id, data.to, returnHandler("BadRequest", cb));
	}
};

Item.prototype.del = function (auth, data, cb) {
	this.ctrl.removeItem(data.id, returnHandler("NotFound", cb));
};


module.exports = Item;
