const json2scss = require("json2scss");

module.exports = function () {
	const Transform = require('stream').Transform;
	let transformStream = new Transform({objectMode: true});

	transformStream._transform = function (file, encoding, callback) {
		file.path = file.path.substr(0, file.path.lastIndexOf('.json')) + '.scss';
		file.contents = Buffer.from(json2scss(file.contents.toString()), encoding);
		callback(null, file);
	};

	return transformStream;
};
