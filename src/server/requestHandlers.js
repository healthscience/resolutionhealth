/**
* Self Sever
*
* deals with site requests
* @class requestHandler
* @package    Self Engine opensource project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var querystring = require("querystring");
var fs = require("fs");
var util = require('util');
var http = require('http');

/**
* loads up home HTML page
* @method start
*
*/
function start(fullpath, response) {
  console.log("Request handler 'start' was called.");

	var data  = '';

	fs.readFile('./index.html', function(err, data) {
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		response.writeHead(200, {"Content-Type": "text/html"});

	  response.end(data);
	});

}



/**
*  simple return of data via CORS proceedure
* @method dataCors
*
*/
function dataCors(fullpath, response, request, couchin, couchlive, authom) {
console.log("Request handler for CORS data");

		// When dealing with CORS (Cross-Origin Resource Sharing)
		// requests, the client should pass-through its origin (the
		// requesting domain). We should either echo that or use *
		// if the origin was not passed.
		var origin = (request.headers.origin || "*");
		// Check to see if this is a security check by the browser to
		// test the availability of the API for the client. If the
		// method is OPTIONS, the browser is check to see to see what
		// HTTP methods (and properties) have been granted to the
		// client.
		if (request.method.toUpperCase() === "OPTIONS"){
			// Echo back the Origin (calling domain) so that the
			// client is granted access to make subsequent requests
			// to the API.
			response.writeHead(
				"204",
				"No Content",
				{
					"access-control-allow-origin": origin,
					"access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
					"access-control-allow-headers": "content-type, accept",
					"access-control-max-age": 10, // Seconds.
					"content-length": 0
				}
			);

			// End the response - we're not sending back any content.
			return( response.end() );
		}

		correctpwd = {"data":"success"};
		checkjson = JSON.stringify(correctpwd);
		response.setHeader("access-control-allow-origin", origin);
		response.writeHead(200, {"Content-Type": "application/json"});
		response.end(checkjson);

}


exports.start = start;
exports.dataCors = dataCors;
