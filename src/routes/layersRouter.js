// Base imports
import express from 'express';
const router = express.Router();

// Models
//import viewModel from '../models/view';

// get all layer entities of given view
router.get('/', (request, response) => {
    response.send('Still OK.');
});

// get all layer entities of given view
router.get('/view/:view_id/layer/', (request, response) => {
});

// update layer entities of given view
router.put('/view/:view_id/layer/:layer_name', (request, response) => {

});


// set the active layer for given view
router.post('/view/:view_id/layer/setActive/:layer_name', (request, response) => {

});
module.exports = router;