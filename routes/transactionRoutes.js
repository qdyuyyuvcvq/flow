const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// CRUD Routes
router.post('/transactions', transactionController.addTransaction);
router.get('/transactions', transactionController.getTransactions);
router.get('/transactions/:id', transactionController.getTransactionById);
router.put('/transactions/:id', transactionController.updateTransactionById);
router.delete('/transactions/:id', transactionController.deleteTransactionById);

// Summary Route
router.get('/summary', transactionController.getSummary);

module.exports = router;
