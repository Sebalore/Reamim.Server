'use strict'

import config from './config.json';
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

import initialState from './data/initialState';
import resources from './data/resources';
import UAVPositionTest from './utills/Kafka/test/UAVPositionTest';


const ws = expressApp => {
    const app = expressApp ||express();
    const server = http.createServer(app);
    const io = socketIO.listen(server);

    io.on('connection', function (socket) {

        //Connected
        socket.emit('CONNECTED', { port: app.get('port')});

        //TODO:Set up kafka client here

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

        //----- simulation of publishing changes made by client
        socket.on('ADD', function (data) {
            console.log('New entity added');
            console.dir(data);
            //TODO: publish on Kafka
        });
    });

    return server;
};

export default ws;