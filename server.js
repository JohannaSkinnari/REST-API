const express = require('express');
const booksRouter = require('./books.router');
const app = express();

app.use(express.json());

// Add Resources
app.use(booksRouter);


app.listen(3000, () => {
    console.log('Server is running!');
});