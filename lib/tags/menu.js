var utils = require('../utils');

exports.name = "menu";
exports.ends = false;

exports.parse = function (str, line, parser, types, stack, opts) {
	parser.on(types.VAR, function (token) {
		console.log(token);
	});

	parser.on(types.STRING, function (token) {
		console.log(token);
	});
};

exports.compile = function (compiler, args, content, parents, options) {
	return args.join(' ') + ';\n';
};
