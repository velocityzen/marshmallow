"use strict";

var MenuTag = function(env, ctrl) {
	this.tags = ['menu'];
	this.ctrl = ctrl;
	this.env = env;
};

MenuTag.prototype.parse = function(parser, nodes) {
	var token = parser.nextToken();
	var args = parser.parseSignature(null, true);
	parser.advanceAfterBlockEnd(token.value);
	return new nodes.CallExtensionAsync(this, 'render', args);
};

MenuTag.prototype.render = function(context, slug, cb) {
	var self = this;

	this.ctrl.get(slug, function(err, result) {
		if(err) {
			cb(err);
		} else {
			if(result.slug === "root") {
				result.slug = "";
			}
			self.env.render("menu/"+slug+".html", result, cb);
		}
	});
};


module.exports = MenuTag;
