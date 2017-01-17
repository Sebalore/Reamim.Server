// server.js
'use strict';
// declare imports [packages]

var _stringify = require('babel-runtime/core-js/json/stringify');

var _JSON$stringify = _interopRequireDefault(_stringify).default;

var _config = require('./config.json');

var config = _interopRequireDefault(_config).default;

var _express = require('express');

var express = _interopRequireDefault(_express).default;

var _bodyParser = require('body-parser');

var bodyParser = _interopRequireDefault(_bodyParser).default;

var _cookieParser = require('cookie-parser');

var cookieParser = _interopRequireDefault(_cookieParser).default;

var _http = require('http');

var http = _interopRequireDefault(_http).default;

var _socket = require('socket.io');

var socketIO = _interopRequireDefault(_socket).default;

var _storeIntialState = require('./data/storeIntialState');

var initialViewState = _interopRequireDefault(_storeIntialState).default;

var _resources = require('./data/resources');

var resources = _interopRequireDefault(_resources).default;

var _UAVPositionTest = require('./utills/Kafka/test/UAVPositionTest');

var UAVPositionTest = _interopRequireDefault(_UAVPositionTest).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// declare general variables 
var port = process.env.PORT || config.port;
//import session from 'express-session';
//imoprt cors from 'cors';

var app = express();
var server = http.Server(app);
var io = socketIO(server);

// start the server
server.listen(port);
console.log('Server is listening to ' + port);

io.on('connection', function (socket) {

  console.log(_JSON$stringify(UAVPositionTest));
  UAVPositionTest.Start();

  var onMessage = function onMessage(msg) {
    var _JSON$parse = JSON.parse(msg),
        id = _JSON$parse.id,
        type = _JSON$parse.type,
        longitude = _JSON$parse.longitude,
        latitude = _JSON$parse.latitude,
        height = _JSON$parse.height;

    socket.emit('ACTION', {
      type: resources.ACTIONS.UPDATE_POSITION.TYPE,
      agent: resources.AGENTS.API,
      data: {
        entityTypeName: type,
        id: id,
        position: { longitude: longitude, latitude: latitude, height: height }
      }
    });
  };

  UAVPositionTest.Subscribe();

  //---- add all initial entities
  // initialViewState.entityTypes
  //   .forEach(entityType => entityType.entities.filter(e => e.id==='debug111').forEach(e =>
  //           socket.emit('ACTION', { 
  //             type: resources.ACTIONS.ADD.TYPE,
  //             agent: resources.AGENTS.API,
  //             data: {
  //                 entityTypeName: entityType.name,
  //                 id: e.id,
  //                 position: e.position,
  //                 label: `${entityType.name}-${e.id}`
  //             }
  //   })));

  //---- simulation of periodic notification of UAV positions
  // initialViewState.entityTypes
  //   .filter(entityType => [resources.ENTITY_TYPE_NAMES.AIRPLANE, resources.ENTITY_TYPE_NAMES.HELICOPTER].includes(entityType.name))
  //     .forEach(entityType => entityType.entities.filter(e => e.id==='debug111').forEach(e =>{
  //       const gen = e.gen(e.position);
  //       setInterval(() => {
  //         const cords = gen.next();
  //           if(!cords.done) {
  //             socket.emit('ACTION', { 
  //               type: resources.ACTIONS.UPDATE_POSITION.TYPE,
  //               agent: resources.AGENTS.API,
  //               data: {
  //                   entityTypeName: entityType.name,
  //                   id: e.id,
  //                   position: cords.value
  //               }                              
  //             });                
  //           }
  //       }, 5000)}));

  //----- simulation of publishing changes made by client
  socket.on('ADD', function (data) {
    console.log('New entity added');
    console.dir(data);
    //TODO: publish on Kafka
  });
});

// //  define middleware [add to the middleware stack the operations done when routing]
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json({
// 	limit : config.bodyLimit
// }));
// app.use(cookieParser());
// //app.use(cors());
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods',  'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


// declare routes
//import layersRouter from './routes/layersRouter';
// // register routes
// app.use('/api', layersRouter);
// // app.use('/users', usersRouter);


// start the server
// app.listen(port);
// console.log('Server is listening to ' + port);
//# sourceMappingURL=server.js.map