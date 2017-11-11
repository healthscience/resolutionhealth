/*
* check steam elements
* casperjs test test/ --baseUrl=http://localhost/resolutionwallet/src/index.html
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Sperate validated data/status with those innovation item seeking validation by the G-coll.");

casper.start(baseUrl, function() {
  this.test.comment('click on build science link');
  this.mouseEvent('click', '#dmap-list');
});

casper.then(function() {
	this.test.comment('check display holder validated science/ seeking validation');
    // need to mock function call
    casper.test.assertVisible('#coll-input-listt', 'visible');
    casper.test.assertExists('#coll-input-list', 'the element exists');

});

casper.run(function() {

	this.test.done();

});
