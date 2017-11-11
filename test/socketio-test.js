var assert = require('assert');
var io = require('socket.io-client');

var socketURL = 'http://localhost:8822';

var options ={
  transports: ['websocket'],
  'force new connection': true
};

var firstconnection = 'start';

describe("socket connect to RW",function(){

  it('Should connect with RW', function(done){
    var client1 = io.connect(socketURL, options);

    client1.on('connect', function(data){

      client1.emit('LKN', firstconnection);

    });

    var gback = '';
    client1.on('g-coll', function(gback){

      assert.equal('guardian-coll-started', gback);
      client1.disconnect();
      done();

    });

  });
});
