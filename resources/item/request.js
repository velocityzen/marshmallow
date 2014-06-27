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

Request.prototype.create = function() {
	var validator = v.basedOn(v.TreeItem, {
			slug: v.path
		});

	if (this.languages) {
		var TreeItemRef = v.wrapper();

		var TreeItem = {
			title: v.translate(v.str, this.languages),
			link: v.opt(v.str),
			order: v.opt([v.slug]),
			items: v.opt(v.dict(v.slug, TreeItemRef))
		};

		TreeItemRef.validator = v.spec(TreeItem);

		var ItemCreate = v.basedOn(TreeItem, {
			slug: v.path
		});

		validator = ItemCreate;
	}

	return validator;
};

Request.prototype.update = function() {
	var validator = {
			id: v.path,
			to: v.or(
				{ slug: v.slug },
				{ link: v.str },
				{ order: [v.slug] },
				{ title: v.opt(v.str) }
			)
		};

	if (this.languages) {
		validator.to = v.or(
			{ slug: v.slug },
			{ link: v.str },
			{ order: [v.slug] },
			{ title: v.translate(v.str, this.languages) }
		);
	}

	return validator;
};

Request.prototype.del = function() {
	return {
		id: v.path
	};
};


module.exports = Request;
