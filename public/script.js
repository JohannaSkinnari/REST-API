window.addEventListener('load', main);

let books = [];
let book = {};

async function main() {
    addEventListeners();
    await loadBooks();
    renderBooks();
    
}

async function loadBooks() {
    const response = await fetch('http://localhost:3000/api/books');
    const data = await response.json();
    for (const book of data){
        books.push(book);
    }
    return books;
}

function renderBooks() {
    const listContainer = document.querySelector('.listContainer');
    listContainer.innerHTML = "";
    books.forEach((book) =>  {
        const bookItem = document.createElement('div');
        bookItem.className = 'bookItem';
        const bookContent = 
        `<h3>${book.title}</h3>
        <div>Author: ${book.author}</div>
        <div>Year: ${book.year}</div>
        <button onclick="loadBook('${book.id}')">Details</button>`
        bookItem.innerHTML = bookContent;
        listContainer.append(bookItem);
    });
}


async function loadBook(id) {
    const response = await fetch('http://localhost:3000/api/books/' + id);
    book = await response.json();

    // return book;
    renderBook();
}

function renderBook() {
    const listContainer = document.querySelector('.listContainer');
    listContainer.innerHTML = "";
    const bookItem = document.createElement('div');
    bookItem.className = 'bookItem';
    const bookContent = 
    `<h2>${book.title}</h2>
    <div>Author: ${book.author}</div>
    <div>Year: ${book.year}</div>
    <button>Back</button>
    <button onclick="deleteBook('${book.id}')">Delete</button>
    <button onclick="renderEditForm(book)">Edit</button>`
    bookItem.innerHTML = bookContent;
    listContainer.append(bookItem);
}

function addEventListeners() {
    const createButton = document.querySelector('.createButton');
    createButton.addEventListener('click', () => createBook());
}

function createBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const newBook = { title, author, year };
    const data = JSON.stringify(newBook)
    fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: data
    })
}

function renderEditForm(book) {
    const editFormContainer = document.querySelector('.editFormContainer');
    editFormContainer.innerHTML = "";

    const editForm = document.createElement('div');
    const editFormContent = `
    <form>
            <h2>Edit ${book.title}</h2>
            <div>
                <label for="editTitle">Title</label>
                <input type="text" name="editTitle" id="editTitle" placeholder="${book.title}" value="${book.title} ">
            </div>
            <div>
                <label for="editAuthor">Author</label>
                <input type="text" name="editAuthor" id="editAuthor" placeholder="${book.author}" value="${book.author} " ">
            </div>
            <div>
                <label for="editYear">Year</label>
                <input type="text" name="editYear" id="editYear" placeholder="${book.year}" value="${book.year}">
            </div>
            <button onclick="editBook('${book.id}')">Save</button>
        </form>
    `
    editForm.innerHTML = editFormContent;
    editFormContainer.append(editForm);
}

function editBook(id) {
    const title = document.getElementById('editTitle').value;
    const author = document.getElementById('editAuthor').value;
    const year = document.getElementById('editYear').value;
    const newBook = { id, title, author, year };
    const data = JSON.stringify(newBook)
    console.log(data);
    fetch('http://localhost:3000/api/books/' + id, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: data
    });
}

function deleteBook(id) {
    console.log('delete function');
    console.log(id);
    fetch('http://localhost:3000/api/books/' + id, {
        method: 'DELETE'
    });
}