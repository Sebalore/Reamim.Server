// server.js
'use strict';

import config from './config.json';
import app from './http-server';
import ws from './ws-server';

app.set('port', process.env.PORT || config.port);
//app.listen(app.get('port'));

const server = ws(app);
server.listen(app.get('port'));

console.log('Server is listening to ' + app.get('port'));