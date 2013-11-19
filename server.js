/* 
 * server.js 
 * 
 * Image thumbnail server.
 * 
 * version			: 0.1.1
 * create date	: 2013.11.02
 * update date 	: 2013.11.18
 *
 */

var util 				= require('util'),
		path 				= require('path'),
		fs 					= require('fs'), 
		http 				= require('http'),
		url 				= require('url'),
		qs 					= require('querystring'),
		request 		= require('request'),
		mime 				= require('mime'),
		thumb				= require('image-thumbnail'),
		config 			= require(path.join(__dirname, 'config.json'));

util.log(JSON.stringify(config, null, 2));

http.createServer(function(req, res) {
	util.log(req.method + ' ' + req.url);
	req.parsedUrl = url.parse(req.url, true);
	switch (req.method + req.parsedUrl.pathname) {
	case 'GET/thumbnail':
    getThumb(req, res);
    return;
  default:
		responseError(res, 404, {message: '404, Not Found'});
    return;
  }
}).listen(config.imageThumbServerPort);
util.log(util.format('image thumbnail server running at %d port...', config.imageThumbServerPort));

function getThumbnail(req, res) {
	if (!req.parsedUrl.query.url || (!req.parsedUrl.query.width && !req.parsedUrl.query.height)) {
		responseError(res, 400, {message: '400, Bad Request'});
		return;
	}

	util.log('request image: start...');
	request({uri: req.parsedUrl.query.url, encoding: 'binary'}, function(e, r, body) {
    if (e || r.statusCode != 200) {
			responseError(res, 200, e || {message: 'request url error'});
      return;
    }
    util.log('request image: finished.');

  	var options = {
			width: 	req.parsedUrl.query.width,
			height: req.parsedUrl.query.height,
			crop: 	req.parsedUrl.query.crop
		};
		util.log(JSON.stringify(params, null, 2));
		thumb.thumbnailBuffer(body, options, function(e, buffer) {
			if (e) {
				responseError(res, 200, e);
				return;
			}
			gm(buffer).format(function(e, format) {
				if (e) {
					responseError(res, 200, e);
					return;
				}
				util.log(format);
				var type = mime.lookup(format);
				res.writeHead(200, {'Content-Type': type});
				res.end(buffer);
				return;
			});
		});
	});
}

function responseError(res, statusCode, e) {
	util.log(JSON.stringify(e, null, 2));
	res.writeHead(statusCode, {'Content-Type': 'application/json'});
	res.end(JSON.stringify({err: e}));
}

