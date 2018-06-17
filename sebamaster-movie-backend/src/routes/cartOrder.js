"use strict";//

const express  = require('express');
const router   = express.Router();

const CartOrderController = require('../controllers/cartOrder');

router.post('/', CartOrderController.addtocart); // Create a ticket in cart
router.delete('/cart', CartOrderController.removefromcart); // Delete a ticket in cart by Id
router.get('/cart/:userId', CartOrderController.listcart); // List all ticket in cart
router.get('/:userId', CartOrderController.listorder); // List all ticket in cart
router.post('/addtoorder', CartOrderController.addtoorder); // Delete a ticket in cart by Id
router.delete('/order', CartOrderController.removefromorder); // Delete a ticket in cart by Id
router.post('/increase', CartOrderController.increaseCartQuantity); // Delete a ticket in cart by Id
router.post('/decrease', CartOrderController.decreaseCartQuantity); // Delete a ticket in cart by Id

module.exports = router;
