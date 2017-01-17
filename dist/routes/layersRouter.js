'use strict';

var _express = require('express');

var express = _interopRequireDefault(_express).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = express.Router();

// Models
//import viewModel from '../models/view';

// get all layer entities of given view
// Base imports
router.get('/', function (request, response) {
    response.send('Still OK.');
});

// get all layer entities of given view
router.get('/view/:view_id/layer/', function (request, response) {});

// update layer entities of given view
router.put('/view/:view_id/layer/:layer_name', function (request, response) {});

// set the active layer for given view
router.post('/view/:view_id/layer/setActive/:layer_name', function (request, response) {});
module.exports = router;
//# sourceMappingURL=layersRouter.js.map