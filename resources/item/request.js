'use strict';
var v = require('../validators');

var Request = function () {};

Request.prototype.unitInit = function(units) {
};

Request.prototype.create = function() {
	return v.basedOn(v.TreeItem, {
		slug: v.path
	});
};

Request.prototype.update = function() {
	return {
		id: v.path,
		to: v.or(
			{ slug: v.slug },
			{ link: v.str },
			{ order: [v.slug] },
			{ title: v.opt(v.str) }
		)
	};
};

Request.prototype.del = function() {
	return {
		id: v.path
	};
};


module.exports = Request;
