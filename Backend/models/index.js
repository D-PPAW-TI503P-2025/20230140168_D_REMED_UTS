const sequelize = require('../config/database');
const Book = require('./book');
const BorrowLog = require('./borrowLog');

const db = {
    sequelize,
    Book,
    BorrowLog
};

// Define associations if needed (none explicitly requested but good practice)
// BorrowLog.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = db;
