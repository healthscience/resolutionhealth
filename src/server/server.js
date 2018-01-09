/**
* Self Server
*
* Start node.js  Server
*
* @package    LKN protocol  server bridge to resolution wallet
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const http = require("http");
const url = require("url");
const sio = require('socket.io');
const fs = require('fs');
const util = require('util');
const EventEmitter = require('events').EventEmitter;

/**
* controls start of node.js server
* @method start
*
*/
function start(route, handle) {

	var app = http.createServer(onRequest).listen(8822);
console.log('server up');

	function onRequest(request, response) {

		var pathname = url.parse(request.url).pathname;
//console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);
	}

	// data for live two way socket data flow for real time display everywhere
		var io = sio.listen(app);

		io.sockets.on('connection', function (socket, server) {

			socket.on("walletlive", function(walletIN){

				if(walletIN == "")
				{


				}

			});
	});

} // closes start function


exports.start = start;
