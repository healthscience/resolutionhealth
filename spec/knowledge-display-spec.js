/*
* check steam elements
* casperjs test test/ --baseUrl=http://localhost/resolutionwallet/src/index.html
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Click and display existing knowledge in the network");

casper.start(baseUrl, function() {
  this.test.comment('click on build new mapping link');
  this.mouseEvent('click', '#dmap-list');
});

casper.then(function() {
  this.test.comment('click get knowledge');
  this.mouseEvent('click', '#get-lkn');

});

casper.then(function() {
	this.test.comment('check display holder present and one entry');
    // need to mock function call
    casper.test.assertVisible('#lkn-cycle-id', 'visible');
    casper.test.assertExists('#lkn-cycle-id', 'the element exists');

});

casper.run(function() {

	this.test.done();

});
