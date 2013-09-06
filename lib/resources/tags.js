"use strict";
var inherits = require('util').inherits;
var Unit = require('units').Unit;
var TreeTag = require('../tags/tree');

var Tags = function () {};
inherits(Tags, Unit);

Tags.prototype.unitInit = function (units) {
	var ctrl = units.require('tree.controller');
	var env = units.require('core.template');
	env.addExtension('TreeTag', new TreeTag(env, ctrl));
};


module.exports = Tags;
