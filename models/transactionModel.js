const db = require('../config/db');

exports.createTransaction = (transaction, callback) => {
    const { type, category, amount, date, description } = transaction;
    const sql = 'INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [type, category, amount, date, description], function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { id: this.lastID });
        }
    });
};
exports.getAllTransactions = (callback) => {
    const sql = 'SELECT * FROM transactions';
    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err);
        } else {
            callback(null, rows);
        }
    });
};

exports.getTransactionById = (id, callback) => {
    const sql = 'SELECT * FROM transactions WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            callback(err);
        } else {
            callback(null, row);
        }
    });
};

exports.updateTransactionById = (id, transaction, callback) => {
    const { type, category, amount, date, description } = transaction;
    const sql = 'UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?';
    db.run(sql, [type, category, amount, date, description, id], function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { message: 'Transaction updated successfully' });
        }
    });
};

exports.deleteTransactionById = (id, callback) => {
    const sql = 'DELETE FROM transactions WHERE id = ?';
    db.run(sql, [id], function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { message: 'Transaction deleted successfully' });
        }
    });
};

exports.getSummary = (callback) => {
    const sql = `
        SELECT 
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
            SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) AS balance
        FROM transactions
    `;
    db.get(sql, [], (err, row) => {
        if (err) {
            callback(err);
        } else {
            callback(null, row);
        }
    });
};
