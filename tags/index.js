"use strict";
let TreeTag = require("./tree");

let Tags = function () {};

Tags.prototype.unitInit = function (units) {
	let env = units.require("core.template");

	if(env && env.addExtension) {
		let ctrl = units.require("tree.controller");
		env.addExtension("TreeTag", new TreeTag(env, ctrl));
	}
};


module.exports = Tags;
