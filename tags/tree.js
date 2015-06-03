"use strict";
var TreeTag = function(env, ctrl) {
	this.tags = ["tree"];
	this.ctrl = ctrl;
	this.env = env;
};

TreeTag.prototype.parse = function(parser, nodes) {
	var token = parser.nextToken();
	var args = parser.parseSignature(null, true);
	parser.advanceAfterBlockEnd(token.value);
	return new nodes.CallExtensionAsync(this, "render", args);
};

TreeTag.prototype.render = function(context, slug, cb) {
	var env = this.env;

	this.ctrl.get(slug, function(err, tree) {
		if(err) {
			cb(null, "");
		} else {
			var result = {
				tree: tree
			};

			if(context.ctx.PATH) {
				result.PATH = context.ctx.PATH;
			}

			var template;
			try {
				template = env.getTemplate("trees/" + slug + ".html");
			} catch(e) {
				template = env.getTemplate("trees/tree.html");
			}
			template.render(result, cb);
		}
	});
};


module.exports = TreeTag;
