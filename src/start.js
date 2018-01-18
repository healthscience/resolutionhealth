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
			getHeartData3();
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

/* Data listeners - getters */
	function getHeartData() {

		let token = tempToken;
		let apiUrl = 'http://188.166.138.93:8882';
		let endpoint = apiUrl + "/heart24data/" + token + '/james';
console.log(endpoint);
  //MOCK RETURNED DATA
	var hrCouplearr = [];
	var heartData = [];
	//heartDatao = {};
	//heartDatao.daystart = new Date();
	//heartDatao.hravg = 64;
	//heartData.push(heartDatao);
	//heartData.forEach(function(couple) {
	//	var hrCouple = {};
	//	hrCouple.x = couple.daystart;
	//	hrCouple.y = couple.hravg;
	//	hrCouplearr.push(hrCouple);
//console.log(hrCouplearr);
//	});
//console.log(heartData);

	axios.get(endpoint)
		.then(function (response) {
console.log('get required heart data');
//console.log(response.data);
			let heartData = response.data;
			let message = "Heart Data Loaded";
			// create an array in chart standard ie. [x, y]
			let hrCouplearr = [];
			heartData.forEach(function(couple) {
//console.log(couple);
				var hrCouple = {};
				hrCouple.x = couple.daystart;
				hrCouple.y = couple.hravg;
				hrCouplearr.push(hrCouple);
			});
//console.log(hrCouplearr);
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
//console.log(config.data.datasets);
					let localcpd = hrCouplearr;
				  let cpd = hrCouplearr.shift();
console.log(cpd.x);
					let rdate = cpd.x;
					let jsdate =  new Date(rdate);
console.log(jsdate);
console.log((jsdate instanceof Date))
					config.data.datasets.forEach(function(dataxy) {
						let wholeb = Math.round(cpd.y);
						let momentd = {};
						momentd = moment(jsdate);//"12-25-1995", "MM-DD-YYYY");//new Date();//moment(cpd.x);
//console.log(momentd);
						dataxy.data.push({
							x:  new Date(),
							y: wholeb
						});
console.log(dataxy.data);
					});
				}

				var color = Chart.helpers.color;
				var config = {
					type: 'bar',
					data: {
						labels: [],
						datasets: [/*{
							label: 'Dataset (line)',
							type: 'line',
							backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
											borderColor: chartColors.red,
							fill: false,
							cubicInterpolationMode: 'monotone',
							data: []
						}, */{
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
							text: 'Heart Rate Beats per minute'
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

console.log('canvas charting starting');
			var ctx = document.getElementById('canvas').getContext('2d');
				window.myBar = new Chart(ctx, config);
		})
		.catch(function (error) {
console.log(error);
  	});
	};

	/* Data listeners - getters */
		function getHeartData2() {

			let token = tempToken;
			let apiUrl = 'http://188.166.138.93:8882';
			let endpoint = apiUrl + "/heart24data/" + token + '/james';
console.log(endpoint);
	  //MOCK RETURNED DATA
		var hrCouplearr = [];
		var heartData = [];

		axios.get(endpoint)
			.then(function (response) {
	console.log('get required heart data');
	//console.log(response.data);
				let heartData = response.data;
				let message = "Heart Data Loaded";
				// create an array in chart standard ie. [x, y]
				let hrCouplearr = [];
				heartData.forEach(function(couple) {
	//console.log(couple);
					var hrCouple = {};
					hrCouple.x = couple.daystart;
					hrCouple.y = couple.hravg;
					hrCouplearr.push(hrCouple);
				});
	//console.log(hrCouplearr);
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
	//console.log(config.data.datasets);
						let localcpd = hrCouplearr;
					  let cpd = hrCouplearr.shift();;
						let rdate = cpd.x;
						let jsdate =  new Date(rdate);
						config.data.datasets.forEach(function(dataxy) {
							let wholeb = Math.round(cpd.y);
							let momentd = {};
							momentd = moment(jsdate);//"12-25-1995", "MM-DD-YYYY");//new Date();//moment(cpd.x);
	//console.log(momentd);
							dataxy.data.push({
								x:  new Date(),
								y: wholeb
							});
	console.log(dataxy.data);
						});
					}

					var color = Chart.helpers.color;
					var config = {
						type: 'bar',
						data: {
							labels: [],
							datasets: [/*{
								label: 'Dataset (line)',
								type: 'line',
								backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
												borderColor: chartColors.red,
								fill: false,
								cubicInterpolationMode: 'monotone',
								data: []
							}, */{
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
								text: 'Heart Rate 24 Average'
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

	console.log('canvas charting starting');
				var ctx = document.getElementById('canvas2').getContext('2d');
					window.myBar = new Chart(ctx, config);
			})
			.catch(function (error) {
	console.log(error);
	  	});
		};

		/* Data listeners - getters */
			function getHeartData3() {

				let token = tempToken;
				let apiUrl = 'http://188.166.138.93:8882';
				let endpoint = apiUrl + "/heart24data/" + token + '/james';
	console.log(endpoint);
		  //MOCK RETURNED DATA
			var hrCouplearr = [];
			var heartData = [];

			axios.get(endpoint)
				.then(function (response) {
console.log('get required activity data');
		//console.log(response.data);
					let heartData = response.data;
					let message = "Accelerometer Data Loaded";
					// create an array in chart standard ie. [x, y]
					let hrCouplearr = [];
					heartData.forEach(function(couple) {
		//console.log(couple);
						var hrCouple = {};
						hrCouple.x = couple.daystart;
						hrCouple.y = couple.hravg;
						hrCouplearr.push(hrCouple);
					});
		//console.log(hrCouplearr);
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
		//console.log(config.data.datasets);
							let localcpd = hrCouplearr;
						  let cpd = hrCouplearr.shift();;
							let rdate = cpd.x;
							let jsdate =  new Date(rdate);
							config.data.datasets.forEach(function(dataxy) {
								let wholeb = Math.round(cpd.y);
								let momentd = {};
								momentd = moment(jsdate);//"12-25-1995", "MM-DD-YYYY");//new Date();//moment(cpd.x);
		//console.log(momentd);
								dataxy.data.push({
									x:  new Date(),
									y: wholeb
								});
		console.log(dataxy.data);
							});
						}

						var color = Chart.helpers.color;
						var config = {
							type: 'bar',
							data: {
								labels: [],
								datasets: [/*{
									label: 'Dataset (line)',
									type: 'line',
									backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
													borderColor: chartColors.red,
									fill: false,
									cubicInterpolationMode: 'monotone',
									data: []
								}, */{
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
									text: 'Accelermeter x,y,z'
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

		console.log('canvas charting starting');
					var ctx = document.getElementById('canvas3').getContext('2d');
						window.myBar = new Chart(ctx, config);
				})
				.catch(function (error) {
		console.log(error);
		  	});
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

    heart.amplitude = 1 + alg.A;
    heart.volume = alg.V;
    heart.bpm = alg.F * 60;
    predicted.amplitude = 1 + alg2.A;
    predicted.volume = alg2.V;
    predicted.bpm = alg2.F * 60;
console.log(heart);
console.log(predicted);
	}

});
