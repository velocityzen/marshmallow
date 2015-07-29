"use strict";
let TreeTag = function(env, ctrl) {
	this.tags = ["tree"];
	this.ctrl = ctrl;
	this.env = env;
};

TreeTag.prototype.parse = function(parser, nodes) {
	let token = parser.nextToken();
	let args = parser.parseSignature(null, true);
	parser.advanceAfterBlockEnd(token.value);
	return new nodes.CallExtensionAsync(this, "render", args);
};

TreeTag.prototype.render = function(context, slug, cb) {
	let env = this.env;

	this.ctrl.get(slug, function(err, tree) {
		if(err || !tree) {
			cb(null, "");
		} else {
			let result = {
				tree: tree
			};

			if(context.ctx.PATH) {
				result.PATH = context.ctx.PATH;
			}

			let template;
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
