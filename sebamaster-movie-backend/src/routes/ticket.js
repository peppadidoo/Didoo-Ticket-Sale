"use strict";//配合，前后端接应上

const express  = require('express');
const router   = express.Router();

const TicketController = require('../controllers/ticket');

router.post('/',TicketController.create);
router.put('/',TicketController.update);
router.delete('/',TicketController.remove);
router.get('/:attractionId',TicketController.list);
router.get('/remainingticket/:ticketId',TicketController.remainingticket);
router.post('/checksale',TicketController.checksale);


module.exports = router;
