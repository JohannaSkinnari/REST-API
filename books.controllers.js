const { v1: uuidv1} = require('uuid');
const { Request, Response, NextFunction } = require('express');
const fs = require('fs');



// TODO om felhantering om det kommer in ett tomt objekt
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function getBooks(req, res, next) {
    fs.readFile('./dataDB.json', (err, data) => {
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
        const book = { id: uuidv1(), ...req.body };
        books.push(book);
        return res.status(201).json(book);
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
    const { id } = req.params;
    const newBook = req.body;
    const book = books.find(book => book.id == id);
    
    if (book) {
        Object.assign(book, newBook);
        return res.status(200).json('Book has been uppdated');
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