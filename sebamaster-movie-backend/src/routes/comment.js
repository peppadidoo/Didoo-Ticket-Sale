"use strict";//

const express  = require('express');
const router   = express.Router();

const CommentController = require('../controllers/comment');

router.post('/', CommentController.addcomment); // Create a new comment
router.delete('/', CommentController.removecomment); // Delete a comment by Id
router.get('/:attractionId', CommentController.listcommentbyattraction); // List all comment
router.get('/visitor/:userId', CommentController.listcommentbyvisitor); // List all comment



module.exports = router;