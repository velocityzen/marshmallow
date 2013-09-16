"use strict";
var inherits = require('util').inherits;
var async = require('async');
var Unit = require('units').Unit;
var methods = require('./methods');

var Tree = function () {};
inherits(Tree, Unit);

Tree.prototype.name = 'tree';

Tree.prototype.methods = methods;

Tree.prototype.unitInit = function (units) {
	this.ctrl = units.require('controller');
};

Tree.prototype.get = function (auth, data, cb) {
	this.ctrl.get(data.slug, cb);
};

Tree.prototype.create = function (auth, data, cb) {
	this.ctrl.create(data, cb);
};

Tree.prototype.update = function (auth, data, cb) {
	this.ctrl.update(data.slug, data.to, cb);
};

Tree.prototype.del = function (auth, data, cb) {
	this.ctrl.remove(data.slug, cb);
};


module.exports = Tree;
