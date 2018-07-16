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

	var heartApp = {};
	var heart = {};
	var predicted = {};
	// check public private key is present direct or via guardian
	// if present, login  (prompt for password if steup)
	// display live heart data UI

function isElectron() {
  //return process && process.versions && (process.versions.electron !== undefined);
	if (typeof require !== 'function') return false;
	  if (typeof window !== 'object') return false;
	  try {
	    const electron = require('electron');
	    if (typeof electron !== 'object') return false;
	  } catch(e) {
	    return false;
	  }
	  return true;
}

var liveele = isElectron();
if(liveele == true)
{
	// for electron
	var fs = require('fs');
	readFile('./src/key/temptoken.txt');
	function readFile(filepath) {
				 fs.readFile(filepath, 'utf-8', function (err, data) {
						 if(err){
								 alert("An error ocurred reading the file :" + err.message);
								 return;
						 }
console.log(data);
						 tempToken = data;
						 $("#signed-in").show();
						 $("#connectivity").show();
						 $("#life-health-menu").show();
						 $("#ptop-view").hide();
						 $("#science-view").hide();
						 $("#wearable-chart").hide();
						 $("#science-view").hide();
						 $("#authorisation-in").text("live-account");
						 $("#authorisation-in").data("live-account", "on");
						 $("#simulation-heart").hide();
				 });
		 }
}
else {
	var tempToken = '';
	fetch('key/temptoken.txt')
  .then(response => response.text())
	.then(text => tempToken = text) //console.log(text))
  .then(function(){
		$("#signed-in").show();
		$("#connectivity").show();
		$("#life-health-menu").show();
  	$("#authorisation-in").text("live-account");
		$("#authorisation-in").data("live-account", "on");
		$("#ptop-view").hide();
		$("#science-view").hide();
		$("#wearable-chart").hide();
		$("#science-view").hide();
		$("#simulation-heart").hide();
	});
}

	$("a").click(function(e) {
		e.preventDefault(e);
		var idclick = $(this).attr("id");
console.log(idclick);
		switch(idclick){

			case "authorisation-in":
				// sign in authorisation
				var accountlive = $("#authorisation-in").data("live-account");
console.log(accountlive);
				if(accountlive == "on")
				{
					$("#signed-in").show();
					$("#connectivity").show();
					//$("#authorisation-in").data("live-account", "on");
					$("#healthscience-governance").hide();
					$("#ptop-view").hide();
					$("#science-view").hide();
					$("#wearable-chart").hide();
					$("#science-view").hide();
					$("#simulation-heart").hide();
				}
				else
				{
					$("#authorisation").show();
					$("#science-view").hide();
					$("#ptop-view").hide();
					$("#wearable-chart").hide();
					$("#science-view").hide();
					$("#simulation-heart").hide();
				}
			break;

			case "governance-api":
				$("#healthscience-governance").show();
				//$("#authorisation").hide();
				//$("#signed-in").hide();
				$("#science-view").hide();
				$("#ptop-view").hide();
				$("#connectivity").hide();
				$("#wearable-chart").hide();
				$("#simulation-heart").hide();
			break;

			case "connectDHT":
				$("#connectivity").show();
				$("#healthscience-governance").hide();
				//$("#authorisation").hide();
				//$("#signed-in").hide();
				$("#science-view").hide();
				$("#ptop-view").hide();
				$("#connectivity").hide();
				$("#wearable-chart").hide();
				$("#simulation-heart").hide();
			break;

			case "science-list":
				$("#science-view").show();
				$("#sensor-data").hide();
				$("#ptop-view").hide();
				$("#authorisation").hide();
				$("#signed-in").hide();
				$("#connectivity").hide();
				$("#wearable-chart").hide();
				$("#simulation-heart").hide();

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

			case "ptop-list":
				$("#ptop-view").show();
				$("#science-view").hide();
				$("#sensor-data").hide();
				$("#mindmap").hide();
				$("#being").hide();
				$("#ourworld").hide();
				$("#stream").hide();
				$("#authorisation").hide();
				$("#signed-in").hide();
				$("#connectivity").hide();
				$("#wearable-chart").hide();
				$("#simulation-heart").hide();
			break;

			case "sensor-list":
				$("#sensor-data").show();
				$("#authorisation").hide();
				$("#ptop-view").hide();
				$("#signed-in").hide();
				$("#connectivity").hide();
				$("#wearable-chart").hide();
				$("#science-view").hide();
				$("#simulation-heart").hide();
			break;

			case "kid-heart-view":
			$("#wearable-chart").show();
			$("#sensor-data").hide();
			$("#authorisation").hide();
			$("#ptop-view").hide();
			$("#signed-in").hide();
			$("#connectivity").hide();
			$("#science-view").hide();
			$("#simulation-heart").hide();
			getHeartData();
			getHeartData2();
			//getHeartData3();
			break;

			case "kid-simulation-view":
			$("#simulation-heart").show();
			$("#wearable-chart").hide();
			$("#sensor-data").hide();
			$("#authorisation").hide();
			$("#ptop-view").hide();
			$("#signed-in").hide();
			$("#connectivity").hide();
			$("#science-view").hide();
			heartsimulation();

			break;

		}
	});



	// button clicks
	$("button").click(function(e) {
		e.preventDefault(e);
console.log('button clicked');
		var targetclick = e.target;
console.log(targetclick);
		if($(targetclick).attr("id") == "create-new-key")
		{
console.log('private key making');
			$("#authorisation").hide();
			$("#authorisation-in").data("live-account", "on");
			$("#authorisation-in").text('Account LIVE');
			$("#life-health-menu").show();
		}

	});

	// chart button clicks
	$("#wearable-chart").click(function(e) {
		e.preventDefault(e);
console.log('button chart clicked');
		var targetclick = e.target;
console.log(targetclick);
	  // need to call SAFEflow and update chart
		let token = tempToken;
		let pubkey = "22FQ8dJEApww33p31935";
		let apiUrl = 'http://165.227.244.213:8881/';
		let endpoint = apiUrl + "heartdata/" + pubkey + "/" + token;
		axios.get(endpoint)
			.then(function (response) {
console.log('get required updated heart data');
// prepare the incoming data for display
//console.log(response.data);
				let heartDataIN = response.data;
//console.log(heartData);
				let message = "Heart Data Loaded";
			 	//create an array in chart standard ie. [x, y]
				let hrCouplearr = [];
				heartDataIN.forEach(function(couple) {

					//var newlabel = 992232323232;
					//var newhrData = 99;
					barChartData.labels.push(couple.timestamp);
					barChartData.datasets[0].data.push(couple.heartrate);
					window.myBar.update();

					//dataLabel.push(couple.timestamp);
					//heartData.push( moment(couple.heartrate));
				});


		}).catch(function (error) {
console.log(error);
		});
	});

/* Data listeners - getters */
	function getHeartData() {
		var chartbuttons = '';
		chartbuttons += '<button id="addDataset">Add heart average</button>';
		chartbuttons += '<button id="removeDataset">Remove heart average</button>';
    chartbuttons += '<button id="addData">Add new BMP data</button>';
		$("#chart-controls").html(chartbuttons);

		var heartData = [];
		var dataLabel = [];

		var chartColors = {
			red: 'rgb(255, 99, 132)',
			orange: 'rgb(255, 159, 64)',
			yellow: 'rgb(255, 205, 86)',
			green: 'rgb(75, 192, 192)',
			blue: 'rgb(54, 162, 235)',
			purple: 'rgb(153, 102, 255)',
			grey: 'rgb(201, 203, 207)'
		};

		let token = tempToken;
		let pubkey = "22FQ8dJEApww33p31935";
		let apiUrl = 'http://165.227.244.213:8881/';
		let endpoint = apiUrl + "heartdata/" + pubkey + "/" + token;
		axios.get(endpoint)
			.then(function (response) {
console.log('get required heart data');
// prepare the incoming data for display
//console.log(response.data);
				let heartDataIN = response.data;
//console.log(heartData);
				let message = "Heart Data Loaded";
			 	//create an array in chart standard ie. [x, y]
				let hrCouplearr = [];
				heartDataIN.forEach(function(couple) {
					dataLabel.push(couple.timestamp);
					heartData.push( moment(couple.heartrate));
				});
//console.log(dataLabel);
//console.log(heartData);

	var color = Chart.helpers.color;
	    barChartData = {
			labels: dataLabel,
			datasets: [{
				label: 'Dataset 1',
				backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
				borderColor: chartColors.red,
				borderWidth: 1,
				data: heartData
			}, {
				label: 'Dataset 2',
				backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
				borderColor: chartColors.blue,
				borderWidth: 1,
				data: [34,11]
		}]

	};
console.log('canvas charting starting');
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myBar = new Chart(ctx, {
				type: 'bar',
				data: barChartData,
				options: {
					responsive: true,
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'Beats Per Minute'
					}
				}
			});
		})
		.catch(function (error) {
console.log(error);
  	});
	};

	/* Data listeners - getters */
		function getHeartData2() {


		};

		/* Data listeners - getters */
			function getHeartData3() {

			};

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

	/*
	* Heart Simulation
	*/
	function heartsimulation()
	{

    var alg = genetic_alg();
    var alg2 = genetic_alg();
console.log(alg);
console.log(alg2);
	    $("#heartamplitude").html(1 + alg.A);
	    $("#heartvolume").html(alg.V);
	    $("#heartbpm").html(alg.F * 60);
	    $("#predictedamplitude").html(1 + alg2.A);
	    $("#predictheartvolume").html(alg2.V);
	    $("#predictedbpm").html(alg2.F * 60);
	}



});
