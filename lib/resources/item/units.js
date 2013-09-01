"use strict";
var UnitSet = require('units').UnitSet;

var Controller = require('./controller');
var Api = require('./api');
var roles = require('./roles');

var create = function () {
	var units = new UnitSet();

	units.add('controller', new Controller());
	units.add('api', new Api());
	units.expose('roles', roles);

	return units;
};


module.exports = {
	create: create
};
