"use strict";
var TreeTag = require('./tags/tree');

var Tags = function () {};

Tags.prototype.unitInit = function (units) {
	var env = units.require('core.template');

	if(env && env.addExtension) {
		var ctrl = units.require('tree.controller');
		env.addExtension('TreeTag', new TreeTag(env, ctrl));
	}
};


module.exports = Tags;
