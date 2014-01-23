'use strict';
var v = require('../validators');

module.exports = {
	get: function(settings) {
		return {
			slug: v.slug
		};
	},

	create: function(settings) {
		var languages = settings.languages,
			validator = {
				slug: v.slug,
				order: [v.slug],
				items: v.dict(v.slug, v.TreeItem)
			};

		if (languages) {
			var TreeItemRef = v.wrapper();

			var TreeItem = {
				title: v.translate(v.str, languages),
				link: v.opt(v.str),
				order: v.opt([v.slug]),
				items: v.opt(v.dict(v.slug, TreeItemRef))
			};

			TreeItemRef.validator = v.spec(TreeItem);

			validator.items = v.dict(v.slug, TreeItem);
		}

		return validator;
	},

	update: function(settings) {
		var validator = {
				slug: v.slug,
				to: v.or(
					{ slug: v.opt(v.slug) },
					{ order: v.opt([v.slug]) }
				)
			};
			
		return validator;
	},

	del: function(settings) {
		return {
			slug: v.slug
		};
	}
};
