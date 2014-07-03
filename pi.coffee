socket = require('socket.io-client').connect('http://duxca.com:3000')

Arduinode = require("arduinode").Arduinode

async = require("async")

showResult = (cb)-> (err, result)->
  console.log(err, result)
  cb(null, "")

a = new Arduinode "/dev/ttyACM0", ->
  async.series [
    (cb)-> a.pinMode 1, "OUTPUT", showResult cb
    (cb)-> a.pinMode 2, "OUTPUT", showResult cb
    (cb)-> a.pinMode 4, "OUTPUT", showResult cb
    (cb)-> a.pinMode 5, "OUTPUT", showResult cb
    (cb)-> stop(); cb(null, "");
    (cb)->
      socket.on 'connect', (data)-> console.log(data); stop()
      socket.on 'forward', (data)-> console.log(data); forward()
      socket.on 'left', (data)-> console.log(data); left()
      socket.on 'right',(data)-> console.log(data); right()
      socket.on 'back', (data)-> console.log(data); back()
      cb()
    (cb)-> console.log("waiting")
  ]
forward = ->
  console.log "forward"
  async.series [
    (cb)-> a.digitalWrite 1, "HIGH", showResult cb
    (cb)-> a.digitalWrite 2, "LOW", showResult cb
    (cb)-> a.analogWrite 3, 255, showResult cb
    (cb)-> a.digitalWrite 4, "HIGH", showResult cb
    (cb)-> a.digitalWrite 5, "LOW", showResult cb
    (cb)-> a.analogWrite 6, 255, showResult cb
    (cb)-> setTimeout stop, 100
  ]
back = ->
  console.log "back"
  async.series [
    (cb)-> a.digitalWrite 1, "LOW", showResult cb
    (cb)-> a.digitalWrite 2, "HIGH", showResult cb
    (cb)-> a.analogWrite 3, 255, showResult cb
    (cb)-> a.digitalWrite 4, "LOW", showResult cb
    (cb)-> a.digitalWrite 5, "HIGH", showResult cb
    (cb)-> a.analogWrite 6, 255, showResult cb
    (cb)-> setTimeout stop, 100
  ]
right = ->
  console.log "right"
  async.series [
    (cb)-> a.digitalWrite 1, "HIGH", showResult cb
    (cb)-> a.digitalWrite 2, "LOW", showResult cb
    (cb)-> a.analogWrite 3, 255, showResult cb
    (cb)-> a.digitalWrite 4, "LOW", showResult cb
    (cb)-> a.digitalWrite 5, "HIGH", showResult cb
    (cb)-> a.analogWrite 6, 255, showResult cb
    (cb)-> setTimeout stop, 100
  ]
left = ->
  console.log "left"
  async.series [
    (cb)-> a.digitalWrite 1, "LOW", showResult cb
    (cb)-> a.digitalWrite 2, "HIGH", showResult cb
    (cb)-> a.analogWrite 3, 255, showResult cb
    (cb)-> a.digitalWrite 4, "HIGH", showResult cb
    (cb)-> a.digitalWrite 5, "LOW", showResult cb
    (cb)-> a.analogWrite 6, 255, showResult cb
    (cb)-> setTimeout stop, 100
  ]
stop = ->
  console.log "stop"
  async.series [
    (cb)-> a.digitalWrite 1, "HIGH", showResult cb
    (cb)-> a.digitalWrite 2, "HIGH", showResult cb
    (cb)-> a.analogWrite 3, 255, showResult cb
    (cb)-> a.digitalWrite 4, "HIGH", showResult cb
    (cb)-> a.digitalWrite 5, "HIGH", showResult cb
    (cb)-> a.analogWrite 6, 255, showResult cb
  ]
