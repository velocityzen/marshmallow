"use strict";
var inherits = require('util').inherits;
var Unit = require('units').Unit;
var MenuTag = require('../tags/menu');

var Tags = function () {};
inherits(Tags, Unit);

//Tags.prototype.unitIsInitRequired = true;

Tags.prototype.unitInit = function (units) {
	var ctrl = units.require('item.controller');
	var env = units.require('core.template');
	env.addExtension('Marshmallow', new MenuTag(ctrl));
};


module.exports = Tags;
