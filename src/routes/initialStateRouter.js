'use strict';

import initialState from '../data/initialState';
import express from 'express';
const router = express.Router();

// Models
//import viewModel from '../models/view';

// get all layer entities of given view
router.get('/', (request, response) => {
    response.json(initialState);
});


export default router;