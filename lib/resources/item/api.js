"use strict";
var inherits = require('util').inherits;
var returnHandler = require('apis-return').handler;
var Unit = require('units').Unit;
var v = require('../validators');
var methods = require('./methods');

var Item = function () {};
inherits(Item, Unit);

Item.prototype.name = 'tree/item';

Item.prototype.methods = methods;

Item.prototype.unitInit = function (units) {
	this.ctrl = units.require('tree.controller');

	var languages = units.require('core.settings').languages;

	if (languages) {
		var TreeItemRef = v.wrapper();

		var TreeItem = {
			title: v.translate(v.str, languages),
			link: v.opt(v.str),
			order: v.opt([v.slug]),
			items: v.opt(v.dict(v.slug, TreeItemRef))
		};

		TreeItemRef.validator = v.spec(TreeItem);

		var ItemCreate = v.basedOn(TreeItem, {
			slug: v.path
		});

		methods.create = ItemCreate;
		methods.update.to = v.or(
			{ slug: v.slug },
			{ link: v.str },
			{ order: [v.slug] },
			{ title: v.translate(v.str, languages) }
		);
	}
};

Item.prototype.create = function (auth, data, cb) {
	this.ctrl.createItem(data, returnHandler("BadRequest", cb));
};

Item.prototype.update = function (auth, data, cb) {
	if(data.to.slug) {
		this.ctrl.renameItem(data.slug, data.to.slug, returnHandler("BadRequest", cb));
	} else {
		this.ctrl.updateItem(data.slug, data.to, returnHandler("BadRequest", cb));
	}
};

Item.prototype.del = function (auth, data, cb) {
	this.ctrl.removeItem(data.slug, returnHandler("NotFound", cb));
};


module.exports = Item;
