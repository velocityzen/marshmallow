exports.name = "menu";
exports.ends = false;

exports.parse = function (str, line, parser, types, stack, opts) {
	parser.on(types.VAR, function (token) {
		console.log(1, token);
	});

	parser.on(types.STRING, function (token) {
		console.log(2, token);
	});

	return true;
};

exports.compile = function (compiler, args, content, parents, options) {
	return compiler('menushechka');
};
