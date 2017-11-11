/**
* Self Server
*
* Handles file serves
*
* @property handle
* @type {Object}
* @package    Self Engine open source project
* @copyright  Copyright (c) 2013 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    v0.1.46
*/
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var util = require('util');

var handle = {};
handle["/"] = requestHandlers.start;


server.start(router.route, handle);
