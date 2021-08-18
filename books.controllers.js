const { Request, Response, NextFunction } = require('express');

let indexId = 1;
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

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function getBooks(req, res, next) {
    res.json(books);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function getBook(req, res, next) {
    const { id } = req.params;
    const book = books.find(book => book.id == id);
    if (!book) {
        return res.status(404).json(`No book with id ${id} was found.`);
    }
    res.status(200).json(book);
}

// TODO generera ett GUID??
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function createBook(req, res, next) {
    if (req.body) {
        indexId ++;
        const book = { id: indexId, ...req.body};
        books.push(book);
        return res.status(201).json(book);
    }
    res.status(400).json('Missing body');
}

//TODO håller på med denna
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function updateBook(req, res, next) {
    const { id } = req.params;
    const newBook = req.body;

    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.id == id) {
            book[i] = newBook;
            return res.status(200).json('Book has been uppdated');
        }
    }
    res.status(404).json(`No book with id ${id} was found.`);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function deleteBook(req, res, next) {
    const { id } = req.params;
    const index = books.findIndex(book => book.id == id);
    books.splice(index, 1);
    res.status(200).json('Book was deleted');
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}