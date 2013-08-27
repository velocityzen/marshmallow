"use strict";
var UnitSet = require('units').UnitSet;

var item = require('./item/units');

var create = function () {
	var units = new UnitSet();

	units.addSet('item', item.create());

	return units;
};


module.exports = {
	create: create
};
