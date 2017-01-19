// server.js
'use strict';

var _config = require('./config.json');

var config = _interopRequireDefault(_config).default;

var _httpServer = require('./http-server');

var app = _interopRequireDefault(_httpServer).default;

var _wsServer = require('./ws-server');

var ws = _interopRequireDefault(_wsServer).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

app.set('port', process.env.PORT || config.port);

var server = ws(app);

server.listen(app.get('port'));
console.log('Server is listening to ' + app.get('port'));
//# sourceMappingURL=server.js.map