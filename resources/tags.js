"use strict";
var inherits = require('util').inherits;
var Unit = require('units').Unit;
var TreeTag = require('../tags/tree');

var Tags = function () {};
inherits(Tags, Unit);

Tags.prototype.unitInit = function (units) {
	var env = units.require('core.template');

	if(env && env.addExtension) {
		var ctrl = units.require('tree.controller');
		env.addExtension('TreeTag', new TreeTag(env, ctrl));
	}
};


module.exports = Tags;
