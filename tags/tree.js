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
			cb(null);
		} else {
			result.PATH = context.ctx.PATH;
			result.LANGUAGE = context.ctx.LANGUAGE;
			self.env.render("tree/"+slug+".html", result, cb);
		}
	});
};


module.exports = TreeTag;