const express = require('express');
const router = express.Router();
const customersRouter = require('../controllers/CustomersController');

router.get('/customers', customersRouter.index);

// router.get('/contacts/:id', contactsRouter.detail);

module.exports = router;