/* 
 * thumbnail.js
 * 
 * Image thumbnail module.
 *
 * version			: 0.1.0
 * create date	: 2013-11-18
 * update date	: 2013-11-18
 *
 */

var util 	= require('util'),
		gm 		= require('gm');

exports.thumbnailBuffer = function(image, options, callback) {
	try {
		if (options.crop) {
			gm(image)
			.resize(options.width, options.height, '^')
			.gravity(options.crop)
			.extent(options.width, options.height)
			.toBuffer(callback);
		} else {
			gm(image)
			.resize(options.width, options.height)
			.toBuffer(callback);
		}
	} 
	catch(e) {
		callback(e, null);
	}
}

exports.thumbnailFile = function(image, thumb, options, callback) {
	try {
		if (options.crop) {
			gm(image)
			.resize(options.width, options.height, '^')
			.gravity(options.crop)
			.extent(options.width, options.height)
			.write(thumb, callback);
		} else {
			gm(image)
			.resize(options.width, options.height)
			.write(thumb, callback);
		}
	} 
	catch(e) {
		callback(e);
	}
}

exports.thumbnailStream = function(image, options, callback) {
	try {
		var stream;
		if (options.crop) {
			stream = gm(image)
			.resize(options.width, options.height, '^')
			.gravity(options.crop)
			.extent(options.width, options.height)
			.stream();
		} else {
			stream = gm(image)
			.resize(options.width, options.height)
			.stream();
		}
		callback(null, stream);
	} 
	catch(e) {
		callback(e, null);
	}
}
 

