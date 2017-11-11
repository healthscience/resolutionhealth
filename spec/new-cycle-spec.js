/*
* check steam elements
* casperjs test test/ --baseUrl=http://localhost/resolutionwallet/src/index.html
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Add a new science cycle");

casper.start(baseUrl, function() {
  this.test.comment('click on science link');
  this.mouseEvent('click', '#dmap-list');
});

casper.then(function() {
	this.test.comment('check visable and base sections for dynamic content');
	casper.test.assertExists('#new-lkn-cycle', 'the element exists');
  casper.test.assertExists('#lkn-start-cycle', 'the element exists');
  casper.test.assertNotVisible('#k-in-form', 'not visible');

});

casper.then(function() {
  this.test.comment('click new cycle start');
  this.mouseEvent('click', '#lkn-start-cycle');

});

casper.then(function() {
	this.test.comment('check cycle form is there and input visable');
    // need to mock input  callback leveldb/pouchdb
    casper.test.assertVisible('#k-in-form', 'visible');
    casper.test.assertExists('#lkn-datamodel-validate', 'the element exists');
    casper.test.assertExists('#lkn-data-validation', 'the element exists');
    casper.test.assertExists('#lkn-science-validation', 'the element exists');
    casper.test.assertExists('#lkn-compute-validation', 'the element exists');
    casper.test.assertExists('#lkn-kt-consensus', 'the element exists');

});

casper.run(function() {

	this.test.done();

});
