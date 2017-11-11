/**
* Local wallet data flow
*
*  local data plumbing
* @class levelLocal
*
* @package    dsensor.org  open source project
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://ww
* @version    $Id$
*/
var util = require('util');
var events = require("events");
var fs = require('fs');
var level = require('levelup');
var leveldown = require('leveldown');
//var solc = require('solc');

var levelLocal = function() {

  events.EventEmitter.call(this);
	this.db = level('resolution-wallet');

};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(levelLocal, events.EventEmitter);

/**
*   write to local
* @method saveLocal
*
*/
levelLocal.prototype.saveLocal = function(dataIndex, type, dataIN) {
//console.log('read genome raw');
	var localthis = this;

	localthis.db.put(dataIndex, type, dataIN,  function(dbreply) {
console.log('save success???');

				});

};

/**
*  get local saved contract ids
* @method getDatalocal
*
*/
levelLocal.prototype.getDatalocal = function(type) {
console.log('get data local');
	localthis = this;
  var localtype = type;
  var dataholder = [];
	var returneddata = '';
	var existingscid = '';
	localthis.db.createReadStream()
		.on('data', function (data) {

			existingscid = data.key;
			returneddata = data.value;
      var existingSensor = {};
      existingSensor.scid = existingscid;
      existingSensor.info = returneddata;
      dataholder.push(existingSensor);

	  })
	  .on('error', function (err) {
	    console.log('Oh my!', err);
	  })
	  .on('close', function () {
console.log('Stream closed');

	  })
	  .on('end', function () {
console.log('Stream ended');
      var type = '';
      var results = [];
      localthis.filterSmartContracts(localtype, dataholder);

	  });

};

/**
*  call back for data to client
* @method localCallback
*
*/
levelLocal.prototype.localCallback = function(type, queryData) {

  var localthis = this;

  if(type == 'sensor')
  {
    localthis.emit("datalocalOut", queryData);
  }
  else if(type == 'dmap')
  {

    localthis.emit("dataDmaplocalOut", queryData);
  }

};

/**
*  filter smart contracts by type
* @method filterSmartContracts
*
*/
levelLocal.prototype.filterSmartContracts = function(type, listSmartContracts) {

  // by senor by dmaps
  var localthis = this;
  var sensorExisting = [];
  var dmapsExisting = [];
  var itemsProcessed = 0;
  var localtype = type;
  listSmartContracts.forEach(function(singlecontract){

    var SmartcontractInfo = JSON.parse(singlecontract.info);
    itemsProcessed++;
    if(SmartcontractInfo.type == localtype)
    {
      sensorExisting.push(singlecontract);
    }

    if(itemsProcessed == listSmartContracts.length) {

      localthis.localCallback(localtype, sensorExisting);
    }

  });

};


module.exports = levelLocal;
