'use strict'
/* eslint-disable no-console */
/**
* libPtoP KAD setup a ptop network
*
* deals peer to peer network, tcp, udp, kbuckets etc.
* @class KAD
* @package    Living Knowledge Network Protocol
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util');
const fs = require('fs');
const path = require('path');
const events = require("events");
const crypto = require('crypto');
const getIP = require('external-ip')();
var pouchdbServer = require('./pouchdb-utility.js');

const PeerId = require('peer-id')
const PeerInfo = require('peer-info')
const Node = require('./libp2p-bundle')
const pull = require('pull-stream')
const async = require('async')
const Pushable = require('pull-pushable')
const p = Pushable()
let idListener


var KAD = function() {

  this.dht = {};
  this.liveUtil = new pouchdbServer();
  this.ipPublic = '';
	events.EventEmitter.call(this);
  this.getpublicIP();

  this.pathdir =  path.join(__dirname, '/');// __dirname;///app.getPath('home');

};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(KAD, events.EventEmitter);

/**
*  get the Public IP address
* @method getpublicIP
*
*/
KAD.prototype.getpublicIP = function() {

  var localthis = this;
  var ip = '';
  var setIP = getIP;
  setIP(function (err, ip) {
    if (err) {
        // every service in the list has failed
        throw err;
    }
console.log('extippp' + ip);
    localthis.ipPublic = ip;
    localthis.startDHT(8816);
  });

};

/**
*  Start up the DHT  (distributed hash table module)
* @method startDHT
*
*/
KAD.prototype.startDHT = function(portIn) {

  localthis = this;

  var ipaddress =  this.ipPublic;



};

/**
*  get current knowledge in network
* @method currentKnowledge
*
*/
KAD.prototype.currentKnowledge = function(filter) {

  var localthis = this;
	this.liveUtil.createReadStreamStart(filter, localthis);

};

/**
*  put change listener on all changes to pouchdb
* @method listLocalMessages
*
*/
KAD.prototype.listLocalMessages = function() {

  // try and read all message files in directory
  var localthis = this;
  localthis.liveUtil.createReadStreamChanges(localthis);

};

/**
*  Seed a SINGLE connection on DHT
* @method seedSingle
*
*/
KAD.prototype.seedSingle = function(seedIn) {

  var localthis = this;

};


/**
*  Make a put call ie send a message (to network)
* @method putMessage
*
*/
KAD.prototype.putMessage = function(keyID, message) {


};

/**
*  Read a SINGLE message sent by ID
* @method getMessage
*
*/
KAD.prototype.getMessage = function(keyID) {


};
/**
*  Single hop across the peers
* @method oneHop
*
*/
KAD.prototype.oneHop = function(cDmapIN) {

  var localthis = this;
  var nodebuckets = this.dht._router.hopBucketlist();
    var sizebucketsobject = Object.keys(nodebuckets).length;

    // send message to IP node Protocol and then let the protocol go through the Sampling and scoring.
    // needs instant if Dmap Contract and ....
    var hoplist = [];
    var nodelist = [];
    var combinelist = [];
    var bucks = Object.keys(nodebuckets);

    bucks.forEach(function(buc) {

      var bcont = Object.keys(nodebuckets[buc]);

        bcont.forEach(function(bc) {

          var contacts = nodebuckets[buc][bc];

          contacts.forEach(function(cont) {

            var localcont = {};
            localcont = cont;
            var address = Object.keys(localcont);
            var tempholder = [];
            address.forEach(function(item) {

            if(item == 'port')
            {
              hoplist.push(localcont[item]);
              tempholder.push(localcont[item]);
            }
            else if(item == 'nodeID')
            {
              nodelist.push(localcont[item]);
              tempholder.push(localcont[item]);
              combinelist.push(tempholder);
            }
          });
        });
    });

    });
    var rand = nodelist[Math.floor(Math.random() * nodelist.length)];
console.log('rand chosen');
console.log(rand);
    // send message to this peer, update dmap/sampling contract
    var samplingMessage = {};
    samplingMessage.type = 'Dsampling';
    samplingMessage.text = 'chosen';
    samplingMessage.DmapID = cDmapIN;
    samplingMessage.nodeID = rand;
    var serialiseDmessage = JSON.stringify(samplingMessage);
    // send message to network id.
    this.putMessage('', serialiseDmessage);
    // call smart contract
    // POLICY WHAT IS THE properties to get a 'random' walk  one hope two hopes, select, jump over, statifed etc.
};

module.exports = KAD;
