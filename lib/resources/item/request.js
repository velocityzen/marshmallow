'use strict';
var v = require('../validators');

module.exports = {
	create: function(settings) {
		var languages = settings.languages,
			validator = v.basedOn(v.TreeItem, {
				slug: v.path
			});

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

			validator.create = ItemCreate;
		}

		return validator;
	},

	update: function(settings) {
		var languages = settings.languages,
			validator = {
				slug: v.path,
				to: v.or(
					{ slug: v.slug },
					{ link: v.str },
					{ order: [v.slug] },
					{ title: v.opt(v.str) }
				)
			};
			
		if (languages) {
			validator.to = v.or(
				{ slug: v.slug },
				{ link: v.str },
				{ order: [v.slug] },
				{ title: v.translate(v.str, languages) }
			);
		}
			
		return validator;
	},

	del: function(settings) {
		return {
			slug: v.path
		};
	}
};
