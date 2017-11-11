/**
* LKN pouchdb local
*
* LKN rw Pouchdb utility class
*
*
* @package    LKN protocol
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
var PouchDB = require('pouchdb');

/**
* pouchdb utility class
* @class pouchdbSettings
*/
var pouchdbServer = function() {

	this.livepouch = new PouchDB('rw-store');
};

/**
* create or make live pouchdb database
* @method createPouchdb
*
*/
pouchdbServer.prototype.createPouchdb = function() {



};

/**
* save more than one documents to pouchdb
* @method bulkSave
*
*/
pouchdbServer.prototype.bulkSave = function(datain) {

	this.livepouch.bulkDocs({docs: datain}, function(err, response) {
//console.log(response);
	});

};

/**
* save data to a single document
* @method singleSave
*
*/
pouchdbServer.prototype.post = function(datain) {
console.log('post at ouch');
	this.livepouch.post(datain, function (err, response) {

	});

};

/**
* save data to a single document
* @method postColl
*
*/
pouchdbServer.prototype.postColl = function(datain) {
console.log('post at ouch');
console.log(datain);
	this.livepouch.post(datain, function (err, response) {
		if(err)
		{
console.log('post err');
console.log(err);
		}
console.log(response);
	});

};

pouchdbServer.prototype.updateSingle = function(datain) {


};

/**
* get data on one pouchdb document
* @method getDoc
*
*/
pouchdbServer.prototype.get = function(docid, cb) {
console.log('get being call at pourch');
		this.livepouch.get(docid, function(err, response) {
//console.log(response);
				cb(null, response);

			});

};

/**
* get data on one pouchdb document
* @method getDoc
*
*/
pouchdbServer.prototype.getColl = function(docid, callback) {
console.log('get being call at pouch');
		this.livepouch.get(docid, function(err, response) {
				if(err)
				{
					callback.createCollID();
				}
				else
			 {
					callback.collID = response.collid;//56789;

				}

			});

};

/**
*  Update specific document if ID provided
* @method putDoc
*
*/
pouchdbServer.prototype.put = function(mesgInkey, content, cb) {
console.log('PUT being call at pourch');
	var designDoc = {};
	designDoc = {
	_id: mesgInkey,
	title: content
};

	this.livepouch.put(designDoc, function(err, response) {
console.log(response);
console.log(err);
		cb(null, response.id);

	});

};

/**
* delete one pouchdb document
* @method deleteDoc
*
*/
pouchdbServer.prototype.del = function(docid, cb) {

	this.livepouch.remove(docid, function(err, doc) {

			cb(null);
	});

};

/**
* get list of all pouchdb documents
* @method allDocs
*
*/
pouchdbServer.prototype.createReadStream = function(thisIN) {

		var localthis = this;
		this.livepouch.allDocs({include_docs: true}, function(err, response) {
console.log('all current docs');

			response.rows.forEach(function(newMes){
			 thisIN.emit("newMfile", newMes.doc.title);
			 localthis.emit('data', { key: newMes._id, value: newMes.doc.title });
		});
	});

};

/**
* get list of all pouchdb documents
* @method allDocs
*
*/
pouchdbServer.prototype.createReadStreamStart = function(filterIN, thisIN) {
console.log('read stream being pouch');
		var localthis = this;
		this.livepouch.allDocs({include_docs: true}, function(err, response) {
console.log('all current docs');
console.log(response);
			// need to get start base info first then send updated to template
			var baseContent = [];
			var updateContent = [];
			response.rows.forEach(function(newMes){
				var valueData = JSON.parse(newMes.doc.title);
				var valueData2 = JSON.parse(valueData.value);
console.log(valueData);
					if(valueData2.lkn == 'cycleid')
					{
						//baseContent.push(newMes);
						thisIN.emit("newMfile", newMes.doc.title);
					}
					else
				  {
						updateContent.push(newMes);

					}

		});

		setTimeout(function(){

			updateContent.forEach(function(updateMes){
				thisIN.emit("newMfile", updateMes.doc.title);

			});

		}, 2000);
	});

};

/**
* list changes on pouchdb log
* @method changeLog
*
*/
pouchdbServer.prototype.createReadStreamChanges = function(thisIN) {
console.log('start readstream changes');
		var newLKNM = this.livepouch.changes({
			since: 'now',
			live: true,
			include_docs: true
	}).on('change', function(change) {
	  // handle change
		thisIN.emit("newMfile", change.doc.title);

	}).on('error', function (err) {
console.log(err);
});

};

/**
* a mapquery on pouchdb documents by NAME
* @method mapQueryname
*
*/
pouchdbServer.prototype.mapQueryname = function(callbackin) {

			function map(selfengine) {
				if(selfengine.networkidentity) {
				emit(selfengine.networkidentity, selfengine.networkidentitylink);
				}
			}
			this.livepouch.query({map: map}, {reduce: false}, function(err, response) {
//console.log(response);
				callbackin(response);
		});

};

/**
* a mapquery on pouchdb documents by KNOWLEDGE word
* @method mapQueryknowledge
*
*/
pouchdbServer.prototype.mapQueryknowledge = function(callbackin) {

			function map(selfengine) {
				if(selfengine.knowledgeword) {
				emit(selfengine.knowledgeword, selfengine.knowledgelink);
				}
			}
			this.livepouch.query({map: map}, {reduce: false}, function(err, response) {
//console.log(response);
				callbackin(response);
		});

};

/**
* a mapquery on pouchdb documents by KNOWLEDGE LIST words
* @method mapQueryknowledgelist
*
*/
pouchdbServer.prototype.mapQueryknowledgelist = function(callbackin) {

			function map(selfengine) {
				if(selfengine.knowledgelist) {
				emit(selfengine.knowledgestart, selfengine.knowledgelist);
				}
			}
			this.livepouch.query({map: map}, {reduce: false}, function(err, response) {
//console.log(response);
				callbackin(response);
		});

};



/**
* a mapquery on pouchdb documents by LIVE attention context
* @method mapQueryLIVE
*
*/
pouchdbServer.prototype.mapQueryLIVE = function(callbackin) {

			function map(selfengine) {
				if(selfengine.tooltemplate ) {
					emit(selfengine.lifedata, selfengine.lifedata.networkidentity);
				}
			}
			this.livepouch.query({map: map}, {reduce: false}, function(err, response) {
//console.log('live query callback response');
//console.log(response);
				callbackin(response);
		});

};

/**
* filter applied to pouchdb logs data
* @method filterchangeLog
*
*/
pouchdbServer.prototype.filterchangeLog = function(callbackin) {

	var options = {};
	options.filter = filterin;//'swimmers/nameslist';
	options.include_docs = true;

	options.complete = function(err, response) {

		callbackin(response);
	};

	this.livepouch.changes(options);


};

/**
* copy pouchdb locally or to couchdb?
* @method replicate
*
*/
pouchdbServer.prototype.replicate = function() {

PouchDB.replicate(this.account.pouchdbname, 'selfenginecloud', {
  onChange: onChange,
  complete: onComplete
});


};

/**
* Delete a whole database
* @method deletePouch
*
*/
pouchdbServer.prototype.deletePouch = function() {

	PouchDB.destroy(this.account.pouchdbname, function(err, info) { });


};

module.exports = pouchdbServer;
