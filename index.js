"use strict";
var UnitSet = require('units').UnitSet;

var tree = require('./resources/tree/units');
var item = require('./resources/item/units');
var Tags = require('./tags');

var create = function () {
	var units = new UnitSet();

	units.addSet('tree', tree.create());
	units.addSet('tree.item', item.create());
	units.add('tree.tags', new Tags());

	return units;
};


module.exports = {
	create: create
};
