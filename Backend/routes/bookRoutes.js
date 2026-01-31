const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// Public Routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Admin Routes
router.post('/', authMiddleware(['admin']), bookController.createBook);
router.put('/:id', authMiddleware(['admin']), bookController.updateBook);
router.delete('/:id', authMiddleware(['admin']), bookController.deleteBook);

module.exports = router;
