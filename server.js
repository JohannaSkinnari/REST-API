const express = require('express');
const app = express();

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

app.use(express.json());

// Resource Endpoints
app.get('/api/books', (req, res, next) => {
    res.json(books);
});
app.get('/api/books/:id', (req, res, next) => {

});
app.post('/api/books', (req, res, next) => {
    
});
app.put('/api/books/:id', (req, res, next) => {

});
app.delete('/api/books/:id', (req, res, next) => {

});

app.listen(3000, () => {
    console.log('Server is running!');
});