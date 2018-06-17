"use strict";

const CartOrderModel = require('../models/cartOrder');//这是啥，调用吗
const TicketModel = require('../models/ticket');

const addtocart = async (req, res) => {
    const {
        quantity, ticketId,userId
    } = req.body;
    const cart = await CartOrderModel.create({
        quantity: quantity || 1,
        ticketId,
        userId,
    });

    res.status(200).json(cart);
};

const removefromcart = async (req, res) => {
    const {
        cartOrderId
    } = req.body;

    await CartOrderModel.findByIdAndRemove(cartOrderId);
    res.status(200).json({message: `cart with id${cartOrderId} was deleted`});
};

const listcart = async (req, res) => {
    const{
        userId
    } = req.params;
    const carts = await CartOrderModel.find({userId, status:"inCart"});
    const tickets = await TicketModel.find({
        _id: {
            $in: carts.map(cart => cart.ticketId)
        }
    });
    carts.map(cart => {
        cart.ticket = tickets.filter(ticket => ticket._id === cart.ticketId)[0];
    });

    res.status(200).json(carts);

};

const listorder = async (req, res) => {
    const{
        userId
    } = req.params;
    const orders = await CartOrderModel.find({userId, status:"inOrder"});
    const tickets = await TicketModel.find({
        _id: {
            $in: orders.map(order => order.ticketId)
        }
    });
    orders.map(order => {
        order.ticket = tickets.filter(ticket => ticket._id === order.ticketId)[0];
    });
    res.status(200).json(orders);
};

const addtoorder = async (req, res) => {
    const {cartOrderId} = req.body;
    const order = await CartOrderModel.findByIdAndUpdate(cartOrderId, {
        status: 'inOrder',
    },{
        new: true
    });
    res.status(200).json(order);


};

const removefromorder = async (req, res) => {
    const {
        cartOrderId
    } = req.body;

    await CartOrderModel.findByIdAndRemove(cartOrderId);
    res.status(200).json({message: `order with id${cartOrderId} was deleted`});
};

const increaseCartQuantity = async (req, res) => {
    const {cartOrderId} = req.body;
    const cart = await CartOrderModel.findOneAndUpdate({
        _id: cartOrderId,
    }, {
        $inc: {
            quantity: 1,
        },
    }, {
            new: true
        });

    res.status(200).json(cart);
};

const decreaseCartQuantity = async (req, res) => {
    const {cartOrderId} = req.body;
    const cart = await CartOrderModel.findOneAndUpdate({
        _id: cartOrderId,
    }, {
        $inc: {
            quantity: -1,
        },
    },{
        new: true
    });

    if (cart.quantity < 1) {
        await CartOrderModel.findByIdAndRemove(cartOrderId);
        res.status(200).json({message: `order with id${cartOrderId} was deleted`});
    } else {
        res.status(200).json(cart);
    }
};
module.exports = {//这里为啥也有export
    addtocart,
    removefromcart,
    listcart,
    listorder,
    addtoorder,
    removefromorder,
    increaseCartQuantity,
    decreaseCartQuantity,
};