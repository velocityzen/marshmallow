"use strict";

var valid = require('valid');
var v = valid.validators;

module.exports = {
	opt: v.opt,
	str: v.str,
	arr: v.arr,
	slug: v.rx(/^[-a-z0-9_]{1,60}$/),
};

