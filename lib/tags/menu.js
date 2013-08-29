"use strict";

var MenuTag = function(ctrl) {
	this.tags = ['menu'];
	this.ctrl = ctrl;
};

MenuTag.prototype.parse = function(parser, nodes, lexer) {
	var token = parser.nextToken();
	var args = parser.parseSignature(null, true);
	parser.advanceAfterBlockEnd(token.value);

	return new nodes.CallExtension(this, 'render', args);
};

MenuTag.prototype.render = function(context, slug) {
	console.log(arguments);
	return "menu!";
};

module.exports = MenuTag;
