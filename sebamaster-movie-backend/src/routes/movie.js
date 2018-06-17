"use strict";//配合，前后端接应上

const express  = require('express');
const router   = express.Router();

const MovieController = require('../controllers/movie');


router.get('/', MovieController.list); // List all movies
router.post('/', MovieController.create); // Create a new movie,可以在这里加 athothsation
router.get('/:id', MovieController.read); // Read a movie by Id
router.put('/:id', MovieController.update); // Update a movie by Id
router.delete('/:id', MovieController.remove); // Delete a movie by Id


module.exports = router;