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
const peertopeer = require('./peertopeer.js');
const uuidv4 = require('uuid/v4');
const Coll = require('./coll.js');
const DatamodelVal = require('./validate-datamodel.js');
const DataVal = require('./validate-data.js');
const ScienceVal = require('./validate-science.js');
const ComputeVal = require('./validate-compute.js');
const ConsensusKTstart = require('./consensus-kt.js');

/**
* controls start of node.js server
* @method start
*
*/
function start(route, handle) {

  PeertoPeer = new peertopeer();
  liveColl = new Coll();
  var CycleHolder = {};
  DatamodelValid = new DatamodelVal();
  DataValid = new DataVal();
  ScienceValid = new ScienceVal();
  ComputeValid = new ComputeVal();
  ConsensusKT = new ConsensusKTstart();

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

			socket.on('LKN', function(dataIN){

			if(dataIN == "start")
			{
				socket.emit('g-coll', "guardian-coll-started");

			}
			else if(dataIN == "start-uuid")
			{
				var newUUID = uuidv4();
        var cycleStatus = {};
        cycleStatus.uuid = newUUID;
        cycleStatus.coll = liveColl.collID;
        cycleStatus.datamodel = 0;
        cycleStatus.datamodeluri = '';
        cycleStatus.data = 0;
        cycleStatus.datauri = '';
        cycleStatus.science = 0;
        cycleStatus.scienceuri = '';
        cycleStatus.compute = 0;
        cycleStatus.computeuri = '';
        cycleStatus.rolled = 0;
        cycleStatus.consensus = 0;
        cycleStatus.kt = 0;
        CycleHolder = cycleStatus;
console.log(CycleHolder);
        socket.emit('return-uuid', newUUID);
			}
      if(dataIN == "get-my-contributions")
      {
        PeertoPeer.getKnowledge(liveColl.collID);
      }
      if(dataIN == "get-latest")
      {
        PeertoPeer.getKnowledge('network');
      }
			else if(dataIN == "readm")
			{
				PeertoPeer.readmDHTkad();
			}
      else if(dataIN.type == "validate-datamodel")
      {
          CycleHolder.datamodeluri = dataIN.text;
          DatamodelValid.validatdString(socket, CycleHolder);
      }
      else if(dataIN.type == "add-validate-innovation")
      {
        // build message to add to existing innovation
        var filterText = {};
        //filterText.datamodel = CycleHolder.datamodeluri;
        //filterText.data = CycleHolder.datauri;
        //filterText.science = CycleHolder.scienceuri;
        //filterText.compute = CycleHolder.computeuri;
        var networkData = {};
        networkData.type = 'add-valid-cycle';
        networkData.lkn = dataIN.lkn;
        networkData.cycleid = dataIN.uuid;
        networkData.coll = CycleHolder.coll;
        networkData.text = filterText;
console.log(networkData);
        PeertoPeer.sendmDHTkad(networkData);
      }
      else if(dataIN.type == "validate-data")
      {
         CycleHolder.datauri = dataIN.text;
         DataValid.validatdString(socket, CycleHolder);
      }
      else if(dataIN.type == "validate-science")
      {
          CycleHolder.scienceuri = dataIN.text;
          ScienceValid.validatdString(socket, CycleHolder);
      }
      else if(dataIN.type == "validate-compute")
      {
         CycleHolder.computeuri = dataIN.text;
          ComputeValid.validatdString(socket, CycleHolder);
      }
      else if(dataIN.type == "consensus-kt")
      {
          ConsensusKT.startConsensus(socket);
      }
			else if(dataIN.type == "sendm")
			{
console.log(dataIN);
        // individual validation paths have been validated, send network message
        // first filter what get sent to network
        var filterText = {};
        filterText.datamodel = CycleHolder.datamodeluri;
        filterText.data = CycleHolder.datauri;
        filterText.science = CycleHolder.scienceuri;
        filterText.compute = CycleHolder.computeuri;
        var networkData = {};
        networkData.type = 'valid-cycle';
        networkData.lkn = dataIN.lkn;
        networkData.cycleid = CycleHolder.uuid;
        networkData.coll = CycleHolder.coll;
        networkData.text = filterText;
console.log(networkData);
        PeertoPeer.sendmDHTkad(networkData);

			}
			else if(dataIN.type == "smartcontractID")
			{
				PeertoPeer.sendmDHTkad(dataIN.pubethk);
			}

		});

		PeertoPeer.on("client-message", function(newMessage) {
				// send data back to client with message
				socket.emit('new-message-file', newMessage);

			});

		PeertoPeer.on("sc-notification", function(newSCnotice) {
			// call ethereum api
			socket.emit('new-sc-notification', newSCnotice);

		});

		PeertoPeer.on("lkn-message", function(newSCnotice) {
console.log('validate fae server');
			socket.emit('new-lkn-message', newSCnotice);

		});
	});

} // closes start function


exports.start = start;
