'use strict';

/*
 * Dependencies
 */
var log     = require('./lib/logger');
var config  = require('konfig')({ path: 'config' });
var express = require('express');
var micro   = require('express-microservice-starter');

var WebSocketServer = require('ws').Server;

var server = require('http').createServer();

var url = require('url');

var app = express();
var port = 4080;
var wss = new WebSocketServer({ server: server });

app.use(micro({
  discoverable: true,
  controllersPath: 'lib/controllers',
  monitorsPath: 'lib/monitors'
}));


wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

// app.listen(process.env.PORT || config.app.server.port, function onListen() {
//   log.info('Initialised ' + config.app.microservice.server.name);
// });

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });
