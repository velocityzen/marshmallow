'use strict';
var inherits = require('util').inherits;
var Unit = require('units').Unit;
var v = require('../validators');

var Request = function () {};
inherits(Request, Unit);

Request.prototype.unitInit = function(units) {
	var settings = units.require("core.settings");
	this.languages = settings.languages;
};

Request.prototype.get = function() {
	return {
		id: v.slug
	};
};

Request.prototype.create = function() {
	var validator = {
			slug: v.slug,
			order: [v.slug],
			items: v.dict(v.slug, v.TreeItem)
		};

	if (this.languages) {
		var TreeItemRef = v.wrapper();

		var TreeItem = {
			title: v.translate(v.str, this.languages),
			link: v.opt(v.str),
			order: v.opt([v.slug]),
			items: v.opt(v.dict(v.slug, TreeItemRef))
		};

		TreeItemRef.validator = v.spec(TreeItem);

		validator.items = v.dict(v.slug, TreeItem);
	}

	return validator;
};

Request.prototype.update = function() {
	var validator = {
			id: v.slug,
			to: v.or(
				{ slug: v.opt(v.slug) },
				{ order: v.opt([v.slug]) }
			)
		};

	return validator;
};

Request.prototype.del = function() {
	return {
		id: v.slug
	};
};


module.exports = Request;
