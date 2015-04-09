"use strict";
let UnitSet = require("units").UnitSet;

let tree = require("./resources/tree/units");
let item = require("./resources/item/units");
let Tags = require("./tags");

module.exports = function () {
	let units = new UnitSet();

	units.addSet("tree", tree());
	units.addSet("tree.item", item());
	units.add("tree.tags", new Tags());

	return units;
};
