/*global module, require*/
var faye_websocket       = require('faye-websocket'),
  util       = require('util'),
  BaseWorker = require('./baseworker.js'),
  logger     = require('../logger.js');

/**
 * SocketIOWorker Worker class inherits form BaseWorker
 */
var FSWorker = function (server, generator) {
  FSWorker.super_.apply(this, arguments);
};

util.inherits(FSWorker, BaseWorker);

FSWorker.prototype.createClient = function (callback) {
  var self = this;
  var client = new faye_websocket.Client(this.server);

  client.on('open', function () {
    callback(false, client);
  });

  client.on('connect_error', function (err) {
    if (self.verbose) {
      logger.error("connect error le " + JSON.stringify(err));
    }
    callback(true, client);
  });

  client.on('error', function (err) {
    if (self.verbose) {
      logger.error("error le: " + JSON.stringify(err));
    }
    callback(true, client);
  });
};

module.exports = FSWorker;
