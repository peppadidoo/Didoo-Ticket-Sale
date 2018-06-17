"use strict";

const CommentModel = require('../models/comment');//这是啥，调用吗


const addcomment= async (req, res) => {
    const {
        userId,
        attractionId,
        context,
    } = req.body;

    const comment = await CommentModel.create({userId,attractionId,context});

    res.status(200).json(comment);

};
const removecomment = async(req, res) => {
    const {
        commentId,
    } = req.body;
    await CommentModel.findByIdAndRemove(commentId);

    res.status(200).json({message: `comment with id${commentId} was deleted`});

};
const listcommentbyattraction  = async (req, res) => {
    const {
        attractionId,
    } = req.params;
    const comments = await CommentModel.find({attractionId});
    res.status(200).json(comments);
};
const listcommentbyvisitor  = async (req, res) => {
    const {
        userId,
    } = req.params;
    const comments = await CommentModel.find({userId});
    res.status(200).json(comments);
};

module.exports = {//这里为啥也有export
    addcomment,
    removecomment,
    listcommentbyattraction,
    listcommentbyvisitor,
};