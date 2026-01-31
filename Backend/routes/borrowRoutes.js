const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const authMiddleware = require('../middleware/authMiddleware');

// Borrow Route (User only)
router.post('/', authMiddleware(['user']), borrowController.borrowBook);
router.post('/return', authMiddleware(['user']), borrowController.returnBook);
router.get('/my-active', authMiddleware(['user']), borrowController.getMyActiveBorrows);

// Admin Routes for Borrows
router.get('/', authMiddleware(['admin']), borrowController.getAllBorrowLogs);

module.exports = router;
