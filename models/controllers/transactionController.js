const TransactionModel = require('../models/transactionModel');

exports.addTransaction = (req, res) => {
    TransactionModel.createTransaction(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(result);
    });
};

exports.getTransactions = (req, res) => {
    TransactionModel.getAllTransactions((err, transactions) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(transactions);
    });
};

exports.getTransactionById = (req, res) => {
    const id = req.params.id;
    TransactionModel.getTransactionById(id, (err, transaction) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(transaction);
    });
};

exports.updateTransactionById = (req, res) => {
    const id = req.params.id;
    TransactionModel.updateTransactionById(id, req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

exports.deleteTransactionById = (req, res) => {
    const id = req.params.id;
    TransactionModel.deleteTransactionById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

exports.getSummary = (req, res) => {
    TransactionModel.getSummary((err, summary) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(summary);
    });
};
