'use strict';

import config from './config.json';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import resourceRouter from './routes/resourceRouter';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
    limit : config.bodyLimit
}));
app.use(cookieParser());
//app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',  'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});    
app.use(express.static(path.join(__dirname, 'public')));
app.use('/resources', resourceRouter);
app.get('/', function(req, res) {
  console.log('Get index');
  res.send('OK');
});

export default app;