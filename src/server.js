// server.js
'use strict';
// declare imports [packages]
import config from './config.json';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import socketIO from 'socket.io';
//import session from 'express-session';
//imoprt cors from 'cors';

import initialViewState from './data/storeIntialState';
import resources from './data/resources';

import UAVPositionTest from './utills/Kafka/test/UAVPositionTest';



// declare general variables 
const port = process.env.PORT || config.port;
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// start the server
server.listen(port);
console.log('Server is listening to ' + port);

io.on('connection', function (socket) {

  console.log(JSON.stringify(UAVPositionTest));
  UAVPositionTest.Start();

  let onMessage = msg => {
    const { id, type, longitude, latitude, height } = JSON.parse(msg);
    socket.emit('ACTION', { 
      type: resources.ACTIONS.UPDATE_POSITION.TYPE,
      agent: resources.AGENTS.API,
      data: {
          entityTypeName: type,
          id: id,
          position: { longitude, latitude, height}
      }                              
    });     
  };

  UAVPositionTest.Subscribe(onMessage);

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
