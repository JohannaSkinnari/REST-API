const express = require('express');
const cors = require('cors');
const booksRouter = require('./books.router');
const app = express();

app.use(cors());
app.use(express.json());

// Add Resources
app.use(booksRouter);


app.listen(3000, () => {
    console.log('Server is running!');
});