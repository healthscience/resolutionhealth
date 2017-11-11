/**
*  jQuery listen for clicks and interaction
*
*/
$(document).ready(function(){

	liveSettings = {};
	liveSettings.cloudIP = "http://localhost:8822";
	liveSettings.localIP = "http://localhost:8822";
	liveSettings.localURL = "http://localhost/resolutionwallet/src/index.html";
	liveSettings.DmapURL = "http://localhost/dapp/";
	// connect to socket.io
	var socketpi = io.connect(liveSettings.localIP);
	var liveStoragescid = '';

	$("a").click(function(e) {
		e.preventDefault(e);
		var idclick = $(this).attr("id");
console.log(idclick);
		var cycleid = $("#dht-new-message input#lkn-cycle-message.form-dht").val();

		switch(idclick){

			case "authorisation-in":
				// sign in authorisation
				$("#authorisation").show();
				$("#dmap-view").hide();

			break;

			case "dmap-list":

				$("#dmap-view").show();
				$("#k-in-form").hide();
				$("#authorisation").hide();

				var DmapsLive = '';

				DmapsLive += '<section id="dmaps-order">';
				DmapsLive += '<ul>';
				DmapsLive += '	<li>';
				DmapsLive += '	</li>';
				DmapsLive += '</ul>';
				DmapsLive += '</section>';

				$("#dmap-live-list").html(DmapsLive);

			break;

			case "urllink":

				var buildurl = $(idclick).attr('href');
				window.open(buildurl);

			break;

			case "get-my-lkn":
				//send a message to server to connect to peer to peer Network
				socketpi.emit('LKN', 'get-my-contributions');
				$("#ptop-live-list ul").empty();

			break;

			case "get-network-lkn":
				//send a message to server to connect to peer to peer Network
				socketpi.emit('LKN', 'get-latest');
				$("#network-messages").empty();

			break;

			case "lkn-start-cycle":

				socketpi.emit('LKN', 'start-uuid');
				$("#k-in-form").show();
				$("#roll-to-network").hide();

			break;

		}
	});

	// new cycle form interaction
	$("#k-in-form").click(function(e) {
		e.preventDefault(e);
		var targetFclick = e.target;
		var idclickF = $(targetFclick).attr("id");
console.log(idclickF);
		var cycleidF = $("#cycleid-uuid").data('cycleid');
		switch(idclickF){

		case "lkn-validate-datamodel":
			//send a message to server to connect to peer to peer Network
			var messageContent = {};
			var messageNewstring = $("select#lkn-datamodel-type").val();
console.log(messageNewstring);
			messageContent.type = 'validate-datamodel';
			messageContent.lkn = 'datamodel';
			messageContent.cycleid = cycleidF;
			messageContent.text = messageNewstring;
			socketpi.emit('LKN', messageContent);

		break;

		case "lkn-validate-data":
			//send a message to server to connect to peer to peer Network
			var messageContentd = {};
			var messageNewstringd = $("#dht-new-message input#lkn-data-message.form-dht").val();
			messageContentd.type = 'validate-data';
			messageContentd.lkn = 'data';
			messageContentd.cycleid = cycleidF;
			messageContentd.text = messageNewstringd;
			socketpi.emit('LKN', messageContentd);

		break;

		case "lkn-validate-science":
			//send a message to server to connect to peer to peer Network
			var messageContents = {};
			var messageNewstrings = $("#dht-new-message input#lkn-science-message.form-dht").val();
			messageContents.type = 'validate-science';
			messageContents.lkn = 'science';
			messageContents.cycleid = cycleidF;
			messageContents.text = messageNewstrings;
			socketpi.emit('LKN', messageContents);

		break;

		case "lkn-validate-compute":
			//send a message to server to connect to peer to peer Network
			var messageContentc = {};
			var messageNewstringc = $("select#lkn-compute-type").val();
			messageContentc.type = 'validate-compute';
			messageContentc.lkn = 'compute';
			messageContentc.cycleid = cycleidF;
			messageContentc.text = messageNewstringc;
			socketpi.emit('LKN', messageContentc);

		break;

		case "lkn-consensus-value":
			//send a message to server to connect to peer to peer Network
			var messageContentv = {};
			var messageNewstringv = $("#dht-new-message input#lkn-value-message.form-dht").val();
			messageContentv.type = 'consensus-kt';
			messageContentv.lkn = 'consensus';
			messageContentv.cycleid = cycleidF;
			messageContentv.text = messageNewstringv;
			socketpi.emit('LKN', messageContentv);

		break;

		}

	});

	// check permission statusCode
	$("#network-messages").click(function(e) {
		e.preventDefault(e);
console.log('networkmessage block');
		var targetclick = e.target;
console.log(targetclick);
console.log($(targetclick).attr("id"));
console.log($(targetclick).attr("class"));

		$(targetclick).change(function() {
			// yes or no?
			var valReview = $("select#lkn-validate-type").val();
			var innoCID = $(targetclick).parent().data("icycleid");

			if(valReview == 'yes')
			{
				// send message to network
				addInnovation = {};
				addInnovation.type = 'add-validate-innovation';
				addInnovation.lkn = 'add-validate-innovation';
				addInnovation.uuid = innoCID;
				addInnovation.validate = 'yes';
				socketpi.emit('LKN', addInnovation);
			}
			else
			{
				// send message to network
				addInnovation = {};
				addInnovation.type = 'add-validate-innovation';
				addInnovation.lkn = 'add-validate-innovation';
				addInnovation.uuid = innoCID;
				addInnovation.validate = 'no';
				socketpi.emit('LKN', addInnovation);
			}
		});

		if($(targetclick).attr("id") == "check-permssion-status")
		{
			var smartcontract = $(targetclick).data("scid");
			var getContractpermission = {};
			getContractpermission.type = 'get-permission-status';
			getContractpermission.scid = smartcontract;
			//getContractpermission.pubethk = peerPublicEthereum;
			//getContractpermission.plevel = permissionLevelask;
			socketpi.emit('ethereumAPI', getContractpermission);

		}
		else if ($(targetclick).attr("id") == "set-permission-invite")
		{
			var peerPublicEthereum = $(targetclick).data("pkasker");
			// update the smart contract for this ID permssion / token access
			var matchDatamodeltoStorage = $("#match-storage-scid").val();
			//send a message with smart contract ID to ptop Network
			var setContractpermission = {};
			setContractpermission.type = 'set-permission';
			setContractpermission.scid = matchDatamodeltoStorage;
			setContractpermission.pubethk = peerPublicEthereum;
			setContractpermission.plevel = 2;

			socketpi.emit('ethereumAPI', setContractpermission);

		}
		else if($(targetclick).attr("id") == "urllink")
		{

			var buildurl = $(targetclick).attr('href');
console.log(buildurl);
			window.open(buildurl);

		}
		else if($(targetclick).attr("id") == "add-value")
		{
			var Cuuid = $(targetclick).data('valueinput');
console.log(Cuuid);
			var rollConfirm = '';
			rollConfirm += '	<span id="dht-new-message"><input id="lkn-value-message" class="form-dht" type="text" placeholder=""></input></span><a id="lkn-attribute-value" href="" >Attribute</a>';
			rollConfirm += '<span id="lkn-consensus-status" ></span>';
			// need to id to spefic entry
			$("#express-value-" + Cuuid).append(rollConfirm);

		}

	});

	// button clicks
	$("button").click(function(e) {
		e.preventDefault(e);
console.log('button clicked');
		var targetclick = e.target;
console.log(targetclick);
		if($(targetclick).attr("id") == "send-to-network")
		{
			var messageCyclesend = {};
			var currentCycle = $("#dht-new-message input#lkn-value-message.form-dht").val();
			messageCyclesend.type = 'sendm';
			messageCyclesend.lkn = 'cycleid';
			messageCyclesend.cycleid = currentCycle;
			//messageCyclesend.text = 'broadcast to network';
			socketpi.emit('LKN', messageCyclesend);
			$("#k-in-form").empty();
			$("#roll-to-network").hide();
		}

	});


/*  Socket listeners */
	socketpi.on('dhtlive', function (connect) {

		$("#Dsensor-api-status").text('live');
		$("#Dsensor-api-status").css("background-color", "green");

	});

	socketpi.on('ethconnect-out', function (connect) {

		$("#ethereum-api-status").text('live');
		$("#ethereum-api-status").css("background-color", "green");

	});

	socketpi.on('safe-network', function (connect) {

		$("#maidsafe-api-status").text('live');
		$("#maidsafe-api-status").css("background-color", "green");

	});

	socketpi.on('return-uuid', function (uuidIn) {
		// set UUID for cycle
		// clear existing form
		$("#k-in-form").empty();

		if(uuidIn.length > 0)
		{
			var lkncycle = '';
			lkncycle += '<div id="lkn-cycle-uuid">';
			lkncycle += '<div id="cycleid-uuid" data-cycleid=' + uuidIn + '>UUID - ' + uuidIn + '</div>';
			lkncycle += '	<span id="lkn-datamodel-validate">';
			lkncycle += '<label for="lkn-datamodel-desc">Pre-defined data models:</label>';
			lkncycle += '	<select class="select-datamodel" id="lkn-datamodel-type">';
			lkncycle += '		<option value="none" selected="">Please select</option>';
			lkncycle += '		<option value="LKN-ethos">LKN-ethos</option>';
			lkncycle += '		<option value="LKN-paper">LKN-paper</option>';
			lkncycle += '		<option value="LKN-rw">LKN-rw</option>';
			lkncycle += '		<option value="LKN-guardiancoll">LKN-guardiancoll</option>';
			lkncycle += '		<option value="LKN-lh">LKN-living health</option>';
			lkncycle += '		<option value="LKN--lh-wearable">LH wearables</option>';
			lkncycle += '	</select>';
			lkncycle += '<a id="lkn-validate-datamodel" href="" >Datamodel Validate</a>';
			lkncycle += '<span id="lkn-validate-datamodel-status" ></span>';
			lkncycle += '</div>';
			lkncycle += '<div id="lkn-data-validation">';
			lkncycle += '	<span id="dht-new-message"><input id="lkn-data-message" class="form-dht" type="text" placeholder=""></input></span><a id="lkn-validate-data" href="" >Data Validate</a>';
			lkncycle += '<span id="lkn-validate-data-status" ></span>';
			lkncycle += '</div>';
			lkncycle += '<div id="lkn-science-validation">';
			lkncycle += '	<span id="dht-new-message"><input id="lkn-science-message" class="form-dht" type="text" placeholder=""></input></span><a id="lkn-validate-science" href="" >Science Validate</a>';
			lkncycle += '<span id="lkn-validate-science-status" ></span>';
			lkncycle += '</div>';
			lkncycle += '<div id="lkn-compute-validation">';
			lkncycle += '	<span id="dht-new-message">';
			lkncycle += '<label for="lkn-datamodel-desc">Pre-defined compute types:</label>';
			lkncycle += '	<select class="select-compute" id="lkn-compute-type">';
			lkncycle += '		<option value="none" selected="">Please select</option>';
			lkncycle += '		<option value="local">Local</option>';
			lkncycle += '		<option value="docker">Docker</option>';
			lkncycle += '		<option value="mobile">Mobile</option>';
			lkncycle += '		<option value="cloud">Cloud</option>';
			lkncycle += '		<option value="thinking">Thinking</option>';
			lkncycle += '		<option value="truebits">Truebits</option>';
			lkncycle += '	</select>';
			lkncycle += '</span><a id="lkn-validate-compute" href="" >Compute Validate</a>';
			lkncycle += '<span id="lkn-validate-compute-status" ></span>';
			lkncycle += '</div>';
			lkncycle += '<div id="lkn-kt-consensus">';
			lkncycle += '</div>';

			$("#k-in-form").append(lkncycle);
		}

  });

	socketpi.on('new-lkn-message', function (lknmessageIn) {

			if(lknmessageIn.lkn == 'cycleid' && lknmessageIn.coll == 'me')
			{
				var lknbase = '';
				lknbase += '<li><div id="lkn-cycle-id-' + lknmessageIn.cycleid + '" data-cycleid=' + lknmessageIn.cycleid + '>';
				lknbase += '<span id="inn-cycle-id-' + lknmessageIn.cycleid + '">Cycle = 1</span>';
				lknbase += '<span> ID= ' + lknmessageIn.cycleid + '</span>';
				lknbase += '<span id="lkn-datamodel-' + lknmessageIn.cycleid + '"> Data Model: </span>';
				lknbase += '<span id="lkn-data-' + lknmessageIn.cycleid + '"> Data:  </span>';
				lknbase += '<span id="lkn-science-' + lknmessageIn.cycleid + '"> Science: </span>';
				lknbase += '<span id="lkn-consensus-' + lknmessageIn.cycleid + '"> <a href="" id="start-consensus" >Start Consensus</a> </span>';
				lknbase += '<span id="lkn-compute-' + lknmessageIn.cycleid + '"> Compute: </span>';
				lknbase += '<span id="lkn-value-' + lknmessageIn.cycleid + '"> <a href="" id="add-value" data-valueinput=' + lknmessageIn.cycleid + '>value</a> </span>';
				lknbase += '<span id="express-value-' + lknmessageIn.cycleid + '"></span>';
				lknbase += '<span id="lkn-kt-' + lknmessageIn.cycleid + '"> KT== </span>';
				lknbase += '</div>';
				lknbase += '<li id="add-inn-holder-' + lknmessageIn.cycleid + '"></li>';
				lknbase += '</li>';

				$("#coll-input-list ul").append(lknbase);

				// add context info
				$("#lkn-datamodel-" + lknmessageIn.cycleid).append('<b>' + lknmessageIn.text.datamodel + '</b>');
				$("#lkn-data-" + lknmessageIn.cycleid).append('<a id="urllink" href="' + lknmessageIn.text.data + '">Source</a>');
		  	$("#lkn-science-" + lknmessageIn.cycleid).append('<a id="urllink" href="' + lknmessageIn.text.science + '">Repo</a>');
			  $("#lkn-compute-" + lknmessageIn.cycleid).append('<b>' + lknmessageIn.text.compute + '</b>');

		}
		else if(lknmessageIn.lkn == 'cycleid' && lknmessageIn.coll == 'network')
		{
			var lknbase = '';
			lknbase += '<li>';
			lknbase += '<div id="add-validate" data-icycleid=' + lknmessageIn.cycleid + '>';
			lknbase += '<label for="lkn-validate-innovation">Validate innovation:</label>';
			lknbase += '	<select class="select-valide" id="lkn-validate-type" >';
			lknbase += '		<option value="none" selected="">Please validate</option>';
			lknbase += '		<option value="yes">yes</option>';
			lknbase += '		<option value="no">no</option>';
			lknbase += '	</select>';
			lknbase += '</div>';
			lknbase += '<span id="lkn-cycle-id" data-cycleid=' + lknmessageIn.cycleid + '>';
			lknbase += '<span>Cycle = 1</span>';
			lknbase += '<span> ID= ' + lknmessageIn.cycleid + '</span>';
			lknbase += '<span id="lkn-datamodel-' + lknmessageIn.cycleid + '"> Data Model: </span>';
			lknbase += '<span id="lkn-data-' + lknmessageIn.cycleid + '"> Data:  </span>';
			lknbase += '<span id="lkn-science-' + lknmessageIn.cycleid + '"> Science: </span>';
			lknbase += '<span id="lkn-consensus-' + lknmessageIn.cycleid + '"> <a href="" id="start-consensus" >Start Consensus</a> </span>';
			lknbase += '<span id="lkn-compute-' + lknmessageIn.cycleid + '"> Compute: </span>';
			lknbase += '<span id="lkn-value-' + lknmessageIn.cycleid + '"> <a href="" id="add-value" data-valueinput=' + lknmessageIn.cycleid + '>value</a> </span>';
			lknbase += '<span id="express-value-' + lknmessageIn.cycleid + '"></span>';
			lknbase += '<span id="lkn-kt-' + lknmessageIn.cycleid + '"> KT== </span>';
			lknbase += '</div></li>';

			$("#network-messages ul").append(lknbase);

			// add context info
			$("#lkn-datamodel-" + lknmessageIn.cycleid).append('<b>' + lknmessageIn.text.datamodel + '</b>');
			$("#lkn-data-" + lknmessageIn.cycleid).append('<a id="urllink" href="' + lknmessageIn.text.data + '">Source</a>');
	  	$("#lkn-science-" + lknmessageIn.cycleid).append('<a id="urllink" href="' + lknmessageIn.text.science + '">Repo</a>');
		  $("#lkn-compute-" + lknmessageIn.cycleid).append('<b>' + lknmessageIn.text.compute + '</b>');

		}
		else if(lknmessageIn.lkn == 'add-validate-innovation' && lknmessageIn.coll == 'add-innovation')
		{
console.log('new innovation to add');
console.log(lknmessageIn.cycleid);
			// need to append to an existing innovation
			$("#inn-cycle-id-" + lknmessageIn.cycleid).append('<b> cycle 2</b>');
			$("#add-inn-holder-" + lknmessageIn.cycleid).append('<b> Next innovation</b>');
		}

	});

	socketpi.on('validate-datamodel', function (validateMessage) {

			if(validateMessage == 'passed')
			{
				$("#lkn-validate-datamodel-status").append('<b>' + validateMessage + '</b>');
			}
	});

	socketpi.on('validate-data', function (validateMessage) {

			if(validateMessage == 'passed')
			{
				$("#lkn-validate-data-status").append('<b>' + validateMessage + '</b>');
			}
	});

		socketpi.on('validate-science', function (validateMessage) {

				if(validateMessage == 'passed')
				{
					$("#lkn-validate-science-status").append('<b>' + validateMessage + '</b>');
				}
		});

	socketpi.on('validate-compute', function (validateMessage) {

			if(validateMessage == 'passed')
			{
				$("#lkn-validate-compute-status").append('<b>' + validateMessage + '</b>');
			}
	});

	socketpi.on('validation-complete', function (validateMessage) {

			$("#roll-to-network").show();
	});

	socketpi.on('network-informed', function (validateMessage) {

			if(validateMessage == 'sent')
			{


			}
	});

	socketpi.on('consensus-kt', function (validateMessage) {

			if(validateMessage == 'none')
			{
				$("#lkn-consensus-status").append('<b>' + validateMessage + '</b>');
			}
	});

	livepouch = new pouchdbSettings();
	// save in context of tool  template name
});

(function () {

'use strict';

var $ = document.querySelector.bind(document);

// IndexedDB

var db = new PouchDB('mydb-idb');

db.info().then(function (info) {
$('#idb').innerHTML = '&#10004; We can use PouchDB with IndexedDB!';
}).catch(function (err) {
$('#idb').innerHTML = 'Error for IndexedDB';
});

// WebSQL

var websqlDB = new PouchDB('mydb-websql', {adapter: 'websql'});

websqlDB.info().then(function (info) {
$('#websql').innerHTML = '&#10004; We can use PouchDB with WebSQL!';
}).catch(function (err) {
$('#websql').innerHTML = 'Error for WebSQL';
});

// LevelDB

var NodePouchDB = require('pouchdb');

var leveldbDB = new NodePouchDB('mydb-leveldb');

leveldbDB.info().then(function (info) {
$('#leveldb').innerHTML = '&#10004; We can use PouchDB with LevelDB!';
}).catch(function (err) {
$('#leveldb').innerHTML = 'Error for LevelDB';
});

// node-websql

NodePouchDB.plugin(require('pouchdb-adapter-node-websql'));
var sqliteDB = new NodePouchDB('mydb-sqlite', {adapter: 'websql'});

sqliteDB.info().then(function (info) {
$('#sqlitedb').innerHTML = '&#10004; We can use PouchDB with node-websql (SQLite)!';
}).catch(function (err) {
$('#sqlitedb').innerHTML = 'Error for node-websql (SQLite)';
});

})();
