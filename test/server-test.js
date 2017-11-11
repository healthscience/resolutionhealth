var server = require("../src/server/server.js");
var router = require("../src/server/router.js");
var requestHandlers = require("../src/server/requestHandlers.js");
var util = require('util');
var assert = require('assert'),
      http = require('http');

describe('server', function () {
  before(function () {
    var handle = {};
    handle["/"] = requestHandlers.start;
    server.start(router.route, handle);

  });

  describe('/', function () {
    it('should return 200', function (done) {
      http.get('http://localhost:8822', function (res) {
        assert.equal(200, res.statusCode);
        done();
      });
    });
  });

});
