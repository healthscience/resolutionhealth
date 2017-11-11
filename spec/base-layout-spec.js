/*
* check the default RW html is present
* casperjs test test/ --baseUrl=http://localhost/resolutionwallet/src/index.html
*/
var baseUrl = casper.cli.get('baseUrl');
console.log(baseUrl);
casper.test.comment("Scenario: The RW base section layout");

casper.start(baseUrl, function() {
	this.test.comment('holder for signin');
	casper.test.assertExists('#dmap', 'the element exists');

});

casper.start(baseUrl, function() {
	this.test.comment('holder for science');
	casper.test.assertExists('#authorisation', 'the element exists');

});

casper.then(function() {
	this.test.comment('connectivity holder section');
	casper.test.assertExists('#connectivity', 'the element exists');

});

casper.then(function() {
	this.test.comment('science holder section');
	casper.test.assertExists('#dmap-view', 'the element exists');

});

casper.run(function() {

	this.test.done();

});
