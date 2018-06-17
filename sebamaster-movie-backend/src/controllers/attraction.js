"use strict";

const AttractionModel = require('../models/attraction');//这是啥，调用吗

const search = async (req, res) => {
    const title = req.query.title;//url?后面的
    const titleRegex = new RegExp(title, 'g');
    const attractions = await AttractionModel.find({title: titleRegex});
    res.status(200).json(attractions);
};

const createpreattraction = async (req, res) => {
    const {
        attractionInfo,
    } = req.body;

    const attraction = await AttractionModel.create(attractionInfo);

    res.status(200).json(attraction);
};

const updateattraction = async (req, res) => {
    const {
        attractionId,
        attractionInfo,
    } = req.body;
    const attraction = await AttractionModel.findByIdAndUpdate(attractionId, {
        $set: attractionInfo
    }, {
        new: true
    });
    res.status(200).json(attraction);
};

const removeattraction = async (req, res) => {
    const {
        attractionId,
    } = req.body;
    await AttractionModel.findByIdAndRemove(attractionId);
    res.status(200).json({message: `attraction with id${attractionId} was deleted`});
};

const approveattraction = async (req, res) => {
    const {
        attractionId,
    } = req.body;
    const attraction = await AttractionModel.findByIdAndUpdate(attractionId, {status: 'hasapproved',}, {
        new: true
    });
    res.status(200).json(attraction);
};

const readdetailinfo   = async(req, res) => {
    const {
        attractionId,
    } = req.params;
    const attraction = await AttractionModel.findById(attractionId);

    res.status(200).json(attraction);
};
const readgeneralinfo   = async(req, res) => {
    const {
        attractionId,
    } = req.params;
    const attraction = await AttractionModel.findById(attractionId,{ title: 1,type: 1,address: 1,introduction: 1,rating: 1 ,price:1,posters:1});

    res.status(200).json(attraction);
};
const listpreattraction  = async(req, res) => {

    const attractions = await AttractionModel.find({status:"waitapproved"});
    res.status(200).send(attractions);
};

const listattraction  = async(req, res) => {

    const attractions = await AttractionModel.find({status:"hasapproved"});
    res.status(200).send(attractions);
};



module.exports = {//这里为啥也有export
    search,
    createpreattraction,
    updateattraction,
    removeattraction,
    approveattraction,
    readdetailinfo,
    readgeneralinfo,
    listpreattraction,
    listattraction,
};