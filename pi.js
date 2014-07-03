(function() {
  var Arduinode, a, async, back, forward, left, right, showResult, socket, stop;

  socket = require('socket.io-client').connect('http://duxca.com:3000');

  Arduinode = require("arduinode").Arduinode;

  async = require("async");

  showResult = function(cb) {
    return function(err, result) {
      console.log(err, result);
      return cb(null, "");
    };
  };

  a = new Arduinode("/dev/ttyACM0", function() {
    return async.series([
      function(cb) {
        return a.pinMode(1, "OUTPUT", showResult(cb));
      }, function(cb) {
        return a.pinMode(2, "OUTPUT", showResult(cb));
      }, function(cb) {
        return a.pinMode(4, "OUTPUT", showResult(cb));
      }, function(cb) {
        return a.pinMode(5, "OUTPUT", showResult(cb));
      }, function(cb) {
        stop();
        return cb(null, "");
      }, function(cb) {
        socket.on('connect', function(data) {
          console.log(data);
          return stop();
        });
        socket.on('forward', function(data) {
          console.log(data);
          return forward();
        });
        socket.on('left', function(data) {
          console.log(data);
          return left();
        });
        socket.on('right', function(data) {
          console.log(data);
          return right();
        });
        socket.on('back', function(data) {
          console.log(data);
          return back();
        });
        return cb();
      }, function(cb) {
        return console.log("waiting");
      }
    ]);
  });

  forward = function() {
    console.log("forward");
    return async.series([
      function(cb) {
        return a.digitalWrite(1, "HIGH", showResult(cb));
      }, function(cb) {
        return a.digitalWrite(2, "LOW", showResult(cb));
      }, function(cb) {
        return a.analogWrite(3, 255, showResult(cb));
      }, function(cb) {
        return a.digitalWrite(4, "HIGH", showResult(cb));
      }, function(cb) {
        return a.digitalWrite(5, "LOW", showResult(cb));
      }, function(cb) {
        return a.analogWrite(6, 255, showResult(cb));
      }, function(cb) {
        return setTimeout(stop, 100);
      }
    ]);
  };

  back = function() {
    console.log("back");
    return async.series([
      function(cb) {
        return a.digitalWrite(1, "LOW", showResult(cb));
      }, function(cb) {
        return a.digitalWrite(2, "HIGH", showResult(cb));
      }, function(cb) {
        return a.analogWrite(3, 255, showResult(cb));
      }, function(cb) {
        return a.digitalWrite(4, "LOW", showResult(cb));
      }, function(cb) {
        return a.digitalWrite(5, "HIGH", showResult(cb));
      }, function(cb) {
        return a.analogWrite(6, 255, showResult(cb));
      }, function(cb) {
        return setTimeout(stop, 100);
      }
    ]);
  };

  right = function() {
    console.log("right");
    return async.series([
      function(cb) {
        return a.digitalWrite(1, "HIGH", showResult(cb));
      }, function(cb) {
        return a.digitalWrite(2, "LOW", showResult(cb));
      }, function(cb) {
        return a.analogWrite(3, 255, showResult(cb));
      }, function(cb) {
        return a.digitalWrite(4, "LOW", showResult(cb));
      }, function(cb) {
        return a.digitalWrite(5, "HIGH", showResult(cb));
      }, function(cb) {
        return a.analogWrite(6, 255, showResult(cb));
      }, function(cb) {
        return setTimeout(stop, 100);
      }
    ]);
  };

  left = function() {
    console.log("left");
    return async.series([
      function(cb) {
        return a.digitalWrite(1, "LOW", showResult(cb));
      }, function(cb) {
        return a.digitalWrite(2, "HIGH", showResult(cb));
      }, function(cb) {
        return a.analogWrite(3, 255, showResult(cb));
      }, function(cb) {
        return a.digitalWrite(4, "HIGH", showResult(cb));
      }, function(cb) {
        return a.digitalWrite(5, "LOW", showResult(cb));
      }, function(cb) {
        return a.analogWrite(6, 255, showResult(cb));
      }, function(cb) {
        return setTimeout(stop, 100);
      }
    ]);
  };

  stop = function() {
    console.log("stop");
    return async.series([
      function(cb) {
        return a.digitalWrite(1, "HIGH", showResult(cb));
      }, function(cb) {
        return a.digitalWrite(2, "HIGH", showResult(cb));
      }, function(cb) {
        return a.analogWrite(3, 255, showResult(cb));
      }, function(cb) {
        return a.digitalWrite(4, "HIGH", showResult(cb));
      }, function(cb) {
        return a.digitalWrite(5, "HIGH", showResult(cb));
      }, function(cb) {
        return a.analogWrite(6, 255, showResult(cb));
      }
    ]);
  };

}).call(this);