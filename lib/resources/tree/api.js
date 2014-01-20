"use strict";
var inherits = require('util').inherits;
var Unit = require('units').Unit;
var returnHandler = require('apis-return').handler;

var Tree = function () {};
inherits(Tree, Unit);

Tree.prototype.name = 'tree';

Tree.prototype.unitInit = function (units) {
	this.ctrl = units.require('controller');
};

Tree.prototype.get = function (auth, data, cb) {
	this.ctrl.get(data.slug, returnHandler("NotFound", cb));
};

Tree.prototype.create = function (auth, data, cb) {
	this.ctrl.create(data, returnHandler("BadRequest", cb));
};

Tree.prototype.update = function (auth, data, cb) {
	this.ctrl.update(data.slug, data.to, returnHandler("BadRequest", cb));
};

Tree.prototype.del = function (auth, data, cb) {
	this.ctrl.remove(data.slug, returnHandler("NotFound", cb));
};


module.exports = Tree;
