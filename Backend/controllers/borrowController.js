const { Op } = require('sequelize');
const db = require('../models'); // Import db to access models and sequelize
const { BorrowLog, Book, sequelize } = db; // Destructure required models

exports.borrowBook = async (req, res) => {
    // Start transaction inside the try block or ensure error handling
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const { bookId, latitude, longitude } = req.body;
        const userId = req.user.id;

        if (!bookId || !latitude || !longitude) {
            await transaction.rollback();
            return res.status(400).json({ message: 'bookId, latitude, and longitude are required' });
        }

        // Check if user already has an active borrow for this book
        const existingBorrow = await BorrowLog.findOne({
            where: {
                userId,
                bookId,
                returnDate: null
            },
            transaction
        });

        if (existingBorrow) {
            await transaction.rollback();
            return res.status(400).json({ message: 'You have already borrowed this book' });
        }

        const book = await Book.findByPk(bookId, { transaction });
        if (!book) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.stock <= 0) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Book out of stock' });
        }

        book.stock -= 1;
        await book.save({ transaction });

        const borrowLog = await BorrowLog.create({
            userId,
            bookId,
            latitude,
            longitude
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ message: 'Book borrowed successfully', log: borrowLog });

    } catch (err) {
        if (transaction) await transaction.rollback();
        console.error("Borrow error:", err); // Log error for debugging
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
};

exports.returnBook = async (req, res) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const { bookId } = req.body;
        const userId = req.user.id;

        const borrowLog = await BorrowLog.findOne({
            where: {
                userId,
                bookId,
                returnDate: null
            },
            transaction
        });

        if (!borrowLog) {
            await transaction.rollback();
            return res.status(404).json({ message: 'No active borrow record found for this book' });
        }

        const book = await Book.findByPk(bookId, { transaction });
        if (book) {
            book.stock += 1;
            await book.save({ transaction });
        }

        borrowLog.returnDate = new Date();
        await borrowLog.save({ transaction });

        await transaction.commit();
        res.json({ message: 'Book returned successfully' });
    } catch (err) {
        if (transaction) await transaction.rollback();
        console.error("Return error:", err);
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
};

exports.getAllBorrowLogs = async (req, res) => {
    try {
        const logs = await BorrowLog.findAll({ order: [['borrowDate', 'DESC']] });
        res.json(logs);
    } catch (err) {
        console.error("Get logs error:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.getMyActiveBorrows = async (req, res) => {
    try {
        const userId = req.user.id;
        const activeBorrows = await BorrowLog.findAll({
            where: {
                userId,
                returnDate: null
            }
        });
        res.json(activeBorrows);
    } catch (err) {
        console.error("Get my active borrows error:", err);
        res.status(500).json({ message: err.message });
    }
};
