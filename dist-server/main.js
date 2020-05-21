"use strict";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _socket = _interopRequireDefault(require("socket.io"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 3001;

var HOSTNAME = process.env.HOSTNAME || 'server';

console.log("ID:"+HOSTNAME);

var INDEX = _path.default.join(__dirname, '../dist/index.html'); // define routes and socket

var surveyRouter = require('../routes/survey');

var server = (0, _express.default)();
server.set('views', path.join(__dirname, '../views'));
server.set('view engine', 'pug');

global.gameServer;
//var gameServer=surveyRouter.gameServer;
for (let j = 0; j < process.argv.length; j++) {
    global.gameServer=process.argv[j];
}

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodeParser = bodyParser.urlencoded({ extended: false });
server.use(urlencodeParser);
server.use(jsonParser);

server.use('/survey', surveyRouter);

server.get('/', function (req, res) {
  // res.sendFile(INDEX);
    res.render('index', {hostname: HOSTNAME});
});

server.use('/', _express.default.static(_path.default.join(__dirname, '../dist/')));

var requestHandler = server.listen(PORT, function () {
  return console.log("Listening on ".concat(PORT));
});
var io = (0, _socket.default)(requestHandler); // Game Instances
/*
var gameEngine = new _WiggleGameEngine.default({
  traceLevel: _lanceGg.Lib.Trace.TRACE_NONE
});
var serverEngine = new _WiggleServerEngine.default(io, gameEngine, {
  debug: {},
  updateRate: 6
}); // start the game

serverEngine.start();
*/
//# sourceMappingURL=main.js.map
