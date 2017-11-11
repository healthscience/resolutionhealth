/**
* Peer to Peer
*
* deals peer to peer network, tcp, udp, kbuckets etc.
* @class peerTopeer
* @package    LKN protocol messaging layer
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
var util = require('util');
var events = require("events");
var kadsetup = require('./kadsetup.js');
var net = require('net');

var peerTopeer = function() {
console.log('peer to peer live class');
	events.EventEmitter.call(this);
	this.livepublicIP = '';
	this.liveethpk = '';
 	this.liveDHT = new kadsetup();
	this.filterDHTkad();


};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(peerTopeer, events.EventEmitter);

/**
*  discover Plublic IP address
* @method publicIPaddress
*
*/
peerTopeer.prototype.publicIPaddress = function() {

	//this.livepublicIP = this.liveDHT.getpublicIP();

};

/**
*  set ethereum public key for this client
* @method setEthpk
*
*/
peerTopeer.prototype.setEthpk = function(ekeyIN) {

	this.liveethpk = ekeyIN;

};

/**
*  listen for new messages to filter
* @method startDHTkad
*
*/
peerTopeer.prototype.filterDHTkad = function(portIN) {

	var localthis = this;
	this.liveDHT.listLocalMessages();

	this.liveDHT.on("newMfile", function(newFileIN) {
console.log('listener new message fired');
		var newmessageunknown = newFileIN;
		// filter per type of message
		localthis.filterPtoPmessages(newmessageunknown);
		newmessageunknown = '';

	});

};

/**
*  display existing knowledge to UI
* @method getKnowledge
*
*/
peerTopeer.prototype.getKnowledge = function(filter) {

	this.liveDHT.currentKnowledge(filter);

};

/**
*  seed Peer to Peer network connections
* @method seedmDHTkad
*
*/
peerTopeer.prototype.sendmDHTkad = function(textIN) {

	var serialisemessage = JSON.stringify(textIN);

	this.liveDHT.putMessage('', serialisemessage);

};

/**
*  seed Peer to Peer network connections
* @method readmDHTkad
*
*/
peerTopeer.prototype.readmDHTkad = function() {


	this.liveDHT.getMessage('e907da446512e84e21cfaf5a3ca59b91');

};

/**
*  filter messages for peers and types
* @method filterPtoPmessages
*
*/
peerTopeer.prototype.filterPtoPmessages = function(messagePack) {

	var localthis = this;
console.log('START OF FILTER MESSAGES package message ----------------');
	var makeMessObj = JSON.parse(messagePack);
	var messContent = JSON.parse(makeMessObj.value);
console.log(messContent);
	// filter for this DHT ID node
	if(localthis.liveDHT.dht._self.nodeID == messContent.nodeID)
	{
console.log('what is client node ID --SAMPLING PROTOCOL---');
		// emit message event to ethereum API
		this.emit("sampling-selected", messContent.DmapID);

	}
	if('0x' + localthis.liveethpk == messContent.pubethk)
	{
console.log('filter PUBKEY ============== local PUBKEYS');
		var messageContext = {};
		messageContext.type = messContent.type;
		messageContext.scid = messContent.scid;
		messageContext.pkasker = messContent.pkasker;
		messageContext.data = messContent.data;
		localthis.emit('sc-notification', messageContext);

	}
	else if(messContent.type == 'join')
	{
console.log('filter JOIN messaeg ============== message');
		// pass on message to UI
		localthis.emit('client-message', messagePack);

	}
	else if(messContent.type == 'broadcast')
	{
console.log('filter broadcast messaeg ============== message');
		//filter for types of messages
		// pass on message to UI
		localthis.emit('client-message', messagePack);

	}
	else if(messContent.type == 'smartcontract')
	{
console.log('filter smart contract message ============== smart contract message');
		// pass on message to UI
		localthis.emit('client-message', messagePack);

	}
	else if(messContent.lkn)
	{
console.log('LKN protocol input type ----------->');
console.log(messContent);
		var lknprocess = messContent.lkn;

		switch(lknprocess){

			case "cycleid":
				// need to filter whether this COLL input the innovation
				if(messContent.coll == 123)
				{
					messContent.coll = 'me';
					localthis.emit('lkn-message', messContent);
				}
				else
			  {
					messContent.coll = 'network';
					localthis.emit('lkn-message', messContent);
			  }


			break;

			case "add-validate-innovation":
						messContent.coll = 'add-innovation';
						localthis.emit('lkn-message', messContent);

			break;

			case "datamodel":

						localthis.emit('lkn-message', messContent);

			break;

			case "data":

					localthis.emit('lkn-message', messContent);

			break;

			case "science":

					localthis.emit('lkn-message', messContent);

			break;

			case "compute":

					localthis.emit('lkn-message', messContent);

			break;

			case "value":

					localthis.emit('lkn-message', messContent);

			break;

		}

	}

};

/**
*  Make a single hop across the DHT buckets
* @method singleHop
*
*/
peerTopeer.prototype.singleHop = function(cDmapIN) {

	this.liveDHT.oneHop(cDmapIN);

};

/**
*  simple data vent
* @method dataEvent
*
*/
peerTopeer.prototype.dataEvent = function() {

	var localthis = this;

	setTimeout(function(){

		localthis.emit("peerMessage", "peer");

	}, 9200);

};


module.exports = peerTopeer;
