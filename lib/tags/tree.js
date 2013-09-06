"use strict";

var TreeTag = function(env, ctrl) {
	this.tags = ['tree'];
	this.ctrl = ctrl;
	this.env = env;
};

TreeTag.prototype.parse = function(parser, nodes) {
	var token = parser.nextToken();
	var args = parser.parseSignature(null, true);
	parser.advanceAfterBlockEnd(token.value);
	return new nodes.CallExtensionAsync(this, 'render', args);
};

TreeTag.prototype.render = function(context, slug, cb) {
	var self = this;

	this.ctrl.get(slug, function(err, result) {
		if(err) {
			console.error(err);
			cb(null);
		} else {
			if(result.slug === "root") {
				result.slug = "";
			}
			self.env.render("tree/"+slug+".html", result, cb);
		}
	});
};


module.exports = TreeTag;
