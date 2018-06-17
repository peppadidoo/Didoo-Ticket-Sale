"use strict";

const TicketModel = require('../models/ticket');//这是啥，调用吗
const CartOrderModel =require('../models/cartOrder');

const create = async (req, res) => {
    const {
        ticketInfo
    } = req.body;


    const tickets = await TicketModel.bulkWrite(
        ticketInfo.map(info => ({
            insertOne: {
                document: info
            }
        }))
    );
    res.status(200).json(tickets);
};

const update = async (req, res) => {
    const {
        ticketId,
        date,
        stock
    } = req.body;
    const ticket = await TicketModel.findByIdAndUpdate(ticketId,
        {
            $set: {
                date,
                stock,
            },
        },{
            new: true
        });
    res.status(200).json(ticket);
};

const remove = async (req, res) => {
    const {
        ticketId,
    } = req.body;
    await TicketModel.findByIdAndRemove(ticketId);
    res.status(200).json({message: `ticket with id${ticketId} was deleted`});
};


const list  = async(req, res) => {
    const {
        attractionId,
    } = req.params;
    const tickets = await TicketModel.find({attractionId});
    res.status(200).json(tickets);
};

const remainingticket  = async(req, res) => {
    const {
        ticketId,
    } = req.params;
    const ticket = await TicketModel.findById(ticketId);
    const orders = await CartOrderModel.find({
        ticketId,
        buydate: ticket.date,
    });
    let totalsale = 0;
    let remainingticket;

    orders.forEach((order) => {
            totalsale = totalsale + order.quantity

    });

    remainingticket = ticket.stock - totalsale;
    res.status(200).json(remainingticket);
};
const checksale  = async(req, res) => {
    const {
        fromdate,
        todate,
        attracionId,
    } = req.body;

    let totalsale = 0;

    const tickets = await TicketModel.find({
        attracionId,
        buydate: {
            $lte: todate,
            $gte: fromdate
        }
    });

    const orders = await CartOrderModel.find({
        ticketId:{
            $in: tickets.map((ticket) => ticket._id)//
        }
    });

    orders.forEach((order) => {
        totalsale += order.quantity;
    });
    res.status(200).send(totalsale);
};

module.exports = {//这里为啥也有export
    create,
    update,
    remove,
    list,
    remainingticket,
    checksale,
};