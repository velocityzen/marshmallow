"use strict";
var inherits = require('util').inherits;
var Unit = require('units').Unit;
var menuTag = require('../tags/menu');

var Tags = function () {};
inherits(Tags, Unit);

//Tags.prototype.unitIsInitRequired = true;

Tags.prototype.unitInit = function (units) {
	var engine = units.require('core.template');
	engine.setTag(menuTag.name, menuTag.parse, menuTag.compile, menuTag.ends, menuTag.blockLevel);
};


module.exports = Tags;
