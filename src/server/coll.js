/**
* LKN Collaborative Coll
*
* LKN Coll class
*
*
* @package    LKN protocol
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const crypto = require('crypto');
var pouchdbServer = require('./pouchdb-utility.js');

/**
* COLL
* @class Coll
*/
var Coll = function() {

  this.collID = '';
  this.liveUtil = new pouchdbServer();
  this.readCollID();

};

/**
* create ID
* @method createCollID
*
*/
Coll.prototype.createCollID = function() {

    var collIDnew = 123;
    this.collID = collIDnew;
    // JSON structure
    var collNew = {};
    collNew._id = 'collid';
    collNew.collid = collIDnew;
    //save local to this coll only
    this.liveUtil.postColl(collNew);
};

/**
* read ID
* @method readCollID
*
*/
Coll.prototype.readCollID = function() {

  var localthis = this;
  var existColl = 'collid';
  this.liveUtil.getColl(existColl, localthis);

};

module.exports = Coll;
