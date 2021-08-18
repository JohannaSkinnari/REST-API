const { Request, Response, NextFunction } = require('express');

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
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function createBook(req, res, next) {
    if (req.body) {
        books.push(req.body);
        return res.status(201).json(req.body);
    }
    res.status(400).json('Missing body');
}
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function updateBook(req, res, next) {
}
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function deleteBook(req, res, next) {
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}