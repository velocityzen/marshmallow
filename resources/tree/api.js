"use strict";
var inherits = require('util').inherits;
var Unit = require('units').Unit;
var returnHandler = require('apis-return').handler;

var Tree = function () {};
inherits(Tree, Unit);

Tree.prototype.resource = 'tree';

Tree.prototype.unitInit = function (units) {
	this.ctrl = units.require('controller');
};

Tree.prototype.get = function (auth, data, cb) {
	this.ctrl.get(data.id, returnHandler("NotFound", cb));
};

Tree.prototype.create = function (auth, data, cb) {
	this.ctrl.create(data, returnHandler("BadRequest", cb));
};

Tree.prototype.update = function (auth, data, cb) {
	this.ctrl.update(data.id, data.to, returnHandler("BadRequest", cb));
};

Tree.prototype.del = function (auth, data, cb) {
	this.ctrl.remove(data.id, returnHandler("NotFound", cb));
};


module.exports = Tree;
