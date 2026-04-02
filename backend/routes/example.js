const express = require('express');
const router = express.Router();
const {
    createExample,
    getExamples,
    getExample,
    deleteExample,
    updateExample
} = require('../controllers/exampleController');
const requireAuth = require('../middleware/requireAuth')

// require auth for all example routes
router.use(requireAuth);

// get all example data
router.get('/', getExamples);

// get one example data by id
router.get('/:id', getExample);

// create new example data
router.post('/', createExample);

// delete example data by id
router.delete('/:id', deleteExample);

// update example data by id
router.patch('/:id', updateExample);

module.exports = router;