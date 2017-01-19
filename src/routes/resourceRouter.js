'use strict';

import resources from '../data/resources';
import express from 'express';
const router = express.Router();

// Models
//import viewModel from '../models/view';

// get all layer entities of given view
router.get('/', (request, response) => {
    response.json(resources);
});


export default router;