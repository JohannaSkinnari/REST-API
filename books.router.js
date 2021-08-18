const express = require('express');
const router = express.Router();

const books = [{
    id: 0,
    title: 'tintin',
    author: 'Dante',
    year: 1990
},
{
    id: 1,
    title: 'lily',
    author: 'Erik',
    year: 1990
}];

router.get('/api/books', (req, res, next) => {
    res.json(books);
});
router.get('/api/books/:id', (req, res, next) => {

});
router.post('/api/books', (req, res, next) => {
    
});
router.put('/api/books/:id', (req, res, next) => {

});
router.delete('/api/books/:id', (req, res, next) => {

});

module.exports = router;