const { v1: uuidv1} = require('uuid');
const { Request, Response, NextFunction } = require('express');
const fs = require('fs');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function getBooks(req, res, next) {
    fs.readFile('./bookDB.json', (err, data) => {
        if (err) {
            next(err);
        }
        let books = JSON.parse(data);
        return res.status(200).json(books);
    });
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function getBook(req, res, next) {
    const { id } = req.params;
    fs.readFile('./bookDB.json', (err, data) => {
        if (err) {
            next(err);
        }
        let books = JSON.parse(data);
        const book = books.find(book => book.id == id);
        if (!book) {
            return res.status(404).json(`No book with id ${id} was found.`);
        }
        res.status(200).json(book);
    });
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function createBook(req, res, next) {
    if (req.body) {
        fs.readFile('./bookDB.json', (err, data) => {
            if (err) {
                next(err);
            }
            books = JSON.parse(data);
            book = { id: uuidv1(), ...req.body };
            books.push(book);
            let jsonBooks = JSON.stringify(books);
            fs.writeFile('bookDB.json', jsonBooks, (err) => {
                if (err) {
                    next(err);
                }
            });
            return res.status(201).json(book);
        });
    }
    else {
        res.status(400).json('Missing body');
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function updateBook(req, res, next) {
    if (req.body) {
        const { id } = req.params;
        const newBook = req.body;
        fs.readFile('./bookDB.json', (err, data) => {
            if (err) {
                next(err);
            }
            let books = JSON.parse(data);
            const book = books.find(book => book.id == id);
            if (!book) {
                return res.status(404).json(`No book with id ${id} was found.`);
            }
            Object.assign(book, newBook);
            let jsonBooks = JSON.stringify(books);
            fs.writeFile('bookDB.json', jsonBooks, (err) => {
                if (err) {
                    next(err);
                }
            });
            res.status(200).json(book);
        });
    } 
    else {
        res.status(400).json('Missing body');
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function deleteBook(req, res, next) {
    const { id } = req.params;
    fs.readFile('./bookDB.json', (err, data) => {
        if (err) {
            next(err);
        }
        let books = JSON.parse(data);
        const index = books.findIndex(book => book.id == id);
        if (index == -1) {
            return res.status(404).json(`No book with id ${id} was found.`);
        }
        books.splice(index, 1);
        let jsonBooks = JSON.stringify(books);
        fs.writeFile('bookDB.json', jsonBooks, (err) => {
            if (err) {
                next(err);
            }
        });
        res.status(200).json('Book was deleted');
    });
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}