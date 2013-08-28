"use strict";
var inherits = require('util').inherits;
var Unit = require('units').Unit;
var menuTag = require('../tags/menu');

var Tags = function () {
	this.engine = null;
};
inherits(Tags, Unit);

Tags.prototype.unitInit = function (units) {
	this.engine = units.require('core.template');
	this.engine.addTag(menuTag.name, menuTag.parse, menuTag.compile, menuTag.ends);
};
