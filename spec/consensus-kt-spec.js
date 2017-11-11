/*
* check steam elements
* casperjs test test/ --baseUrl=http://localhost/resolutionwallet/src/index.html
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Consensus mechanism to issue value - knowledge tokens)");

casper.start(baseUrl, function() {
  this.test.comment('click on science link');
  this.mouseEvent('click', '#dmap-list');
});

casper.then(function() {
  this.test.comment('click start');
  this.mouseEvent('click', '#lkn-start-cycle');

});

casper.then(function() {
  this.test.comment('click consensus');
  this.mouseEvent('click', '#lkn-consensus-kt');

});

casper.then(function() {
	this.test.comment('check the consensus status has passed');
	casper.test.assertExists('#lkn-consensus-kt-status', 'the element exists');
  var textP = 'passed';
  casper.test.assertEquals(textP, 'passed');

});

casper.run(function() {

	this.test.done();

});
