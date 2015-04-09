"use strict";
let v = require("../validators");

let Request = function () {};

Request.prototype.unitInit = function(units) {

};

Request.prototype.get = function() {
	return {
		id: v.slug
	};
};

Request.prototype.create = function() {
	return {
		slug: v.slug,
		order: [v.slug],
		items: v.dict(v.slug, v.TreeItem)
	};
};

Request.prototype.update = function() {
	return {
		id: v.slug,
		to: v.or(
			{ slug: v.opt(v.slug) },
			{ order: v.opt([v.slug]) }
		)
	};
};

Request.prototype.del = function() {
	return {
		id: v.slug
	};
};


module.exports = Request;
