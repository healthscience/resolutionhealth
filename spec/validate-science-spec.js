/*
* check steam elements
* casperjs test test/ --baseUrl=http://localhost/resolutionwallet/src/index.html
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Validate a science source link (git hub repo for now)");

casper.start(baseUrl, function() {
  this.test.comment('click on science link');
  this.mouseEvent('click', '#dmap-list');
});

casper.then(function() {
  this.test.comment('click start');
  this.mouseEvent('click', '#lkn-start-cycle');

});

casper.then(function() {
  this.test.comment('click validate datamodel');
  this.mouseEvent('click', '#lkn-validate-science');

});

casper.then(function() {
	this.test.comment('check the validation has passed');
	casper.test.assertExists('#lkn-validate-science-status', 'the element exists');
  var textP = 'passed';
  casper.test.assertEquals(textP, 'passed');

});

casper.run(function() {

	this.test.done();

});
