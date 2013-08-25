"use strict";
var inherits = require('util').inherits;
var async = require('async');
var Unit = require('units').Unit;

var valid = require('valid');
var v = valid.validators;
var vl = require('./validators');

var DuplicateError = require('./errors').DuplicateError;
var ForbiddenError = require('./errors').ForbiddenError;
var BadRequestError = require('./errors').BadRequestError;

var resultErrHandler = require('./errors').resultErrHandler;

var MenuItem = function () {};
inherits(MenuItem, Unit);

MenuItem.prototype.name = 'menu-item';

MenuItem.prototype.validators = {

	get: {
		slug: vl.slug
	},

	create: {
		slug: vl.slug,
		title: v.str,
		items: v.opt(v.arr()),
	},

	update: {
		slug: vl.slug,
		title: v.str,
		items: v.opt(v.arr()),
	},

	del: {
		slug: vl.slug
	}
};

MenuItem.prototype.unitInit = function (units) {
	this.ctrl = units.require('resources.menu-item');
};

MenuItem.prototype.get = function (auth, menuData, cb) {
	this.ctrl.get(auth, menuData.slug, cb);
};

MenuItem.prototype.create = function (auth, menuData, cb) {
	this.ctrl.create(auth, menuData, cb);	
};

MenuItem.prototype.update = function (auth, menuData, cb) {
	this.ctrl.update(auth, menuData, cb);
};

MenuItem.prototype.del = function (auth, menuData, cb) {
	this.ctrl.del(auth, menuData.slug, cb);
};

module.exports = MenuItem;
