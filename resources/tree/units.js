"use strict";
let UnitSet = require("units").UnitSet;

let Controller = require("./controller");
let Api = require("./api");
let Request = require("./request");
let roles = require("./roles");

module.exports = function () {
	let units = new UnitSet();

	units.add("controller", new Controller());
	units.add("api", new Api());
	units.add("request", new Request());
	units.expose("roles", roles);

	return units;
};
