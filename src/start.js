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
						 $("#authorisation-in").data("live-account");
						 $("#authorisation-in").data("live-account", "on");
						 $("#ptop-view").hide();
						 $("#science-view").hide();
						 $("#wearable-chart").hide();
						 $("#science-view").hide();
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
		$("#authorisation-in").data("live-account");
		$("#authorisation-in").data("live-account", "on");
		$("#ptop-view").hide();
		$("#science-view").hide();
		$("#wearable-chart").hide();
		$("#science-view").hide();
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
					$("#ptop-view").hide();
					$("#science-view").hide();
					$("#wearable-chart").hide();
					$("#science-view").hide();
				}
				else
				{
					$("#authorisation").show();
					$("#science-view").hide();
					$("#ptop-view").hide();
					$("#wearable-chart").hide();
					$("#science-view").hide();
				}
			break;

			case "science-list":
				$("#science-view").show();
				$("#ptop-view").hide();
				$("#authorisation").hide();
				$("#signed-in").hide();
				$("#connectivity").hide();
				$("#wearable-chart").hide();

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
			break;

			case "sensor-list":
				$("#sensor-data").show();
				$("#authorisation").hide();
				$("#ptop-view").hide();
				$("#signed-in").hide();
				$("#connectivity").hide();
				$("#wearable-chart").hide();
				$("#science-view").hide();
			break;

			case "kid-heart-view":
			$("#wearable-chart").show();
			$("#sensor-data").hide();
			$("#authorisation").hide();
			$("#ptop-view").hide();
			$("#signed-in").hide();
			$("#connectivity").hide();
			$("#science-view").hide();
			getHeartData();
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

/* Data listeners - getters */
	function getHeartData() {

		let token = tempToken;
		let apiUrl = 'http://188.166.138.93:8882';
		let endpoint = apiUrl + "/heart24data/" + token + '/james';
console.log(endpoint);
		axios.get(endpoint)
		.then(function (response) {
console.log('get required heart data');
console.log(response);
			let heartData = response.data;
			let message = "Heart Data Loaded";

			/* charting */

				var chartColors = {
					red: 'rgb(255, 99, 132)',
					orange: 'rgb(255, 159, 64)',
					yellow: 'rgb(255, 205, 86)',
					green: 'rgb(75, 192, 192)',
					blue: 'rgb(54, 162, 235)',
					purple: 'rgb(153, 102, 255)',
					grey: 'rgb(201, 203, 207)'
				};

				function newDate(ms) {
					return moment().add(ms, 'ms');
				}

				function randomScalingFactor() {
					return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
				}

				function onRefresh() {
					config.data.labels.push(moment());
					config.data.datasets.forEach(function(dataset) {
						dataset.data.push(randomScalingFactor());
					});
				}

				var color = Chart.helpers.color;
				var config = {
					type: 'bar',
					data: {
						labels: [],
						datasets: [{
							label: 'Dataset (line)',
							type: 'line',
							backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
											borderColor: chartColors.red,
							fill: false,
							cubicInterpolationMode: 'monotone',
							data: []
						}, {
							label: 'Dataset (bars)',
							backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
							borderColor: chartColors.blue,
											borderWidth: 1,
							data: []
						}]
					},
					options: {
						responsive: true,
						title: {
							display: true,
							text: 'Mixed chart (horizontal scroll) sample'
						},
						scales: {
							xAxes: [{
								type: 'realtime',
								display: true,
								time: {
									unitStepSize: 1
								}
							}],
							yAxes: [{
								type: 'linear',
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'value'
								}
							}]
						},
						tooltips: {
							intersect: false
						},
						hover: {
							mode: 'nearest',
							intersect: false
						},
						plugins: {
							streaming: {
								duration: 20000,
								refresh: 1000,
								delay: 2000,
								onRefresh: onRefresh
							}
						}
					}
				};

				//window.onload = function() {
		console.log('canvas charting starting');
					var ctx = document.getElementById('canvas').getContext('2d');
					window.myBar = new Chart(ctx, config);
				//};

				document.getElementById('randomizeData').addEventListener('click', function() {
					config.data.datasets.forEach(function(dataset) {
						for (var i = 0; i < dataset.data.length; ++i) {
							dataset.data[i] = randomScalingFactor();
						}
					});

					window.myBar.update();
				});

				var colorNames = Object.keys(chartColors);
				document.getElementById('addDataset').addEventListener('click', function() {
					var colorName = colorNames[config.data.datasets.length % colorNames.length];
					var newColor = chartColors[colorName];
					var newDataset = {
						label: 'Dataset ' + config.data.datasets.length,
						type: 'line',
						backgroundColor: color(newColor).alpha(0.5).rgbString(),
						borderColor: newColor,
						fill: false,
						cubicInterpolationMode: 'monotone',
						data: new Array(config.data.labels.length)
					};

					config.data.datasets.push(newDataset);
					window.myBar.update();
				});

				document.getElementById('removeDataset').addEventListener('click', function() {
					config.data.datasets.pop();
					window.myBar.update();
				});

				document.getElementById('addData').addEventListener('click', function() {
					onRefresh();

					window.myBar.update();
				});






		})
		.catch(function (error) {
    console.log(error);
  	});
	}


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

});
