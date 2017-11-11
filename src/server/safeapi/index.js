/**
* Dsensor SAFE API
*
*  Interacts with SAFE API from maidsafe open source project
* @class dataModel
*
* @package    dsensor.og  open source project
* @copyright  Copyright (c) 2015 James Littlejohn
* @license    http://ww
* @version    $Id$
*/
var util = require('util');
var events = require("events");
var fs = require('fs');
var request = require('request');

var safeAPI = function() {

	events.EventEmitter.call(this);
  //this.request = require('request');
  this.endpoint = ''
  this.safetoken = '';
	this.loglist = [];
	this.results = [];
	this.setToken();
	//this.createDirectory();

};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(safeAPI, events.EventEmitter);

/**
*   set the token for the API
* @method setToken
*
*/
safeAPI.prototype.setToken = function(smContIN) {

  var localthis = this;
  var endpoint = 'http://localhost:8100/auth';

  // authorization payload
  var payload = {
    "app": {
      "name": "Dsensor test",
      "id": "com.dsensor.wearable",
      "version": "0.0.1",
      "vendor": "Dsensor"
    },
    "permissions": [
      "SAFE_DRIVE_ACCESS"
    ]
  };

  var onResponse = function(err, response, body) {
    if (err) {
      return console.error(err.message);
    }
    if (response.statusCode === 401) {
      return console.error('Failed to authorize');
    }

      localthis.safetoken = body.token;
      var contractinfo = {};
			contractinfo.scid = smContIN;
			contractinfo.safetoken = body.token;
			// set token in smart contracts
			//localthis.emit("settoken-access", contractinfo);
			localthis.emit("safe-storage", "live");
			localthis.createDirectory();

    };

  request.post(endpoint, {
    json: true,
    body: payload
  }, onResponse);

};


/**
*  call command line for list of logs in file location
* @method commandlineFiles
*
*/
safeAPI.prototype.commandlineFiles = function(callback) {

	var localthis = this;
	this.loglist = fs.readdirSync('wearableparser/src/testdata');
console.log('the list to process  SAFE API');
console.log(this.loglist);
	this.serialflow(this.loglist.shift(), callback);

};


/**
*  serial flow utility function
* @method serialflow
*
*/
safeAPI.prototype.serialflow = function(item, callback) {

	var localthis = this;
  if(item) {
    this.createFile(item, function(result) {
    	localthis.results.push(result);
			return localthis.serialflow(localthis.loglist.shift(), callback);
    });

  }
  else
  {
    return this.final(callback);
  }

};

/**
*  inform last files has started processing
* @method final
*
*/
safeAPI.prototype.final = function(callback) {
console.log('Done with last file SAFE', this.results);	
	callback();

};

/**
*   create a private directory
* @method createDirectory
*
*/
safeAPI.prototype.createDirectory = function() {

  var localthis = this;
  var endpoint = 'http://localhost:8100/nfs/directory/app/wearabledata';
  var payload = {
    isPrivate: true,
    metadata: new Buffer('wearable amiigo logs').toString('base64')
  };

  var onResponse = function(err, response, body) {
    if (err) {
      return console.error(err.message);
    }
    if (response.statusCode === 401) {
      return console.error('Failed to authorize');
    }
    if (response.statusCode === 200) {

        //localthis.createFile("Log_2015-02-17-14-03-46_0.log");
        //return console.log('Directory created');
    }
console.error('Failed to create directory.', body);
  };

  request.post(endpoint, {
    auth: {
      bearer: localthis.safetoken
   // pass the auth token
    },
    json: true,
    body: payload
  }, onResponse);


};

/**
*   create a file on vault network
* @method createFile
*
*/
safeAPI.prototype.createFile = function(fileIN, callback) {

  var localthis = this;
  var endpoint = 'http://localhost:8100/nfs/file/app/wearabledata/' + fileIN;

  var onResponse = function(err, response, body) {
    if (err) {
			callback(fileIN);
      return console.error(err.message);
    }
    if (response.statusCode === 401) {
			callback(fileIN);
      return console.error('Failed to authorize');
    }
    if (response.statusCode === 200) {
      //return console.log('File created');
			callback(fileIN);
    }
		callback(fileIN);
    console.error('Failed to create file.', body);
  };

  var localFilePath = 'wearableparser/src/testdata/' + fileIN;
  var size = fs.statSync(localFilePath).size;

  fs.createReadStream(localFilePath).pipe(request.post(endpoint, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': size,
      'Metadata': new Buffer('wearable amiigo sensor').toString('base64')
    },
    auth: {
      bearer: localthis.safetoken
    }
  }, onResponse));

};

/**
*   get a file on vault network
* @method getFile
*
*/
safeAPI.prototype.getFile = function(fileIN) {

  var localthis = this;
  var endpoint = 'http://localhost:8100/nfs/file/app/wearabledata/' + fileIN;

  var onResponse = function(err, response, body) {
    if (err) {
      return console.error(err.message);
    }
    if (response.statusCode === 401) {
      return console.error('Failed to authorize');
    }
    if (response.statusCode === 200) {
      console.log(JSON.stringify(response.headers));
      return console.log('File downloaded');
    }
    console.error('Failed to download file.', body);
  };

  var filestream = fs.createWriteStream('out/' + fileIN); // local path
  request.get(endpoint, {
    auth: {
      bearer: localthis.safetoken
    }
  }, onResponse).pipe(filestream);


};

module.exports = safeAPI;
