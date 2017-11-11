/*
* check steam elements
* casperjs test test/ --baseUrl=http://localhost/resolutionwallet/src/index.html
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Click on science menu link to display");

casper.start(baseUrl, function() {
	casper.test.assertNotVisible('#dmap-view', 'not visible');

});

casper.then(function() {
	this.test.comment('click on build new mapping link');
	this.mouseEvent('click', '#dmap-list');

});

casper.then(function() {
	this.test.comment('check visable and base sections for dynamic content');
	casper.test.assertExists('#dmap-view', 'the element exists');
	casper.test.assertVisible('#dmap-view', 'visible');
	casper.test.assertExists('#ptop-live-list', 'the element exists');
	casper.test.assertVisible('#ptop-live-list', 'visible');
	casper.test.assertExists('#network-messages', 'the element exists');
	//casper.test.assertVisible('#network-messages', 'visible');

});

casper.run(function() {

	this.test.done();

});
