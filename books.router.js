const express = require('express');
const { 
    getBooks, 
    getBook, 
    createBook, 
    updateBook, 
    deleteBook 
} = require('./books.controllers')
const router = express.Router();


// Define endpoints
router.get('/api/books', getBooks);
router.get('/api/books/:id', getBook);
router.post('/api/books', createBook);
router.put('/api/books/:id', updateBook);
router.delete('/api/books/:id', deleteBook);

module.exports = router;