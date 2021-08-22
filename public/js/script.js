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
    const h2Container = document.querySelector('.h2Container');
    h2Container.innerHTML = "";
    const h2 = document.createElement('h2');
    const h2Content = `List of Books`
    h2.innerHTML = h2Content;
    h2Container.append(h2);

    const bookContainer = document.querySelector('.bookContainer');
    bookContainer.innerHTML = "";
    books.forEach((book) =>  {
        const bookItem = document.createElement('div');
        bookItem.classList = 'p-3 mb-3 bookItem';
        const bookContent = 
        `<h3>${book.title}</h3>
        <div>Author: ${book.author}</div>
        <div class="mb-2">Year: ${book.year}</div>
        <button class="btn" onclick="loadBook('${book.id}')">Details</button>`
        bookItem.innerHTML = bookContent;
        bookContainer.append(bookItem);
    });
}


async function loadBook(id) {
    const response = await fetch('http://localhost:3000/api/books/' + id);
    book = await response.json();

    renderBook();
}

function renderBook() {
    const h2Container = document.querySelector('.h2Container');
    h2Container.innerHTML = "";
    const h2 = document.createElement('h2');
    const h2Content = `${book.title}'s Details`
    h2.innerHTML = h2Content;
    h2Container.append(h2);

    const bookContainer = document.querySelector('.bookContainer');
    bookContainer.innerHTML = "";
    const bookItem = document.createElement('div');
    bookItem.classList = 'p-3 mb-3 bookItem';
    const bookContent = 
    `<h3>${book.title}</h3>
    <div>Author: ${book.author}</div>
    <div class="mb-2">Year: ${book.year}</div>
    <button class="btn mr-2" onclick="renderBooks()">Back</button>
    <button class="btn mr-2 btn-delete" onclick="deleteBook('${book.id}')">Delete</button>
    <button class="btn btn-edit" onclick="renderEditForm(book)">Edit</button>`
    bookItem.innerHTML = bookContent;
    bookContainer.append(bookItem);
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
    const h2Container = document.querySelector('.h2Container');
    h2Container.innerHTML = "";
    const h2 = document.createElement('h2');
    const h2Content = `Edit ${book.title}`
    h2.innerHTML = h2Content;
    h2Container.append(h2);

    const editFormContainer = document.querySelector('.editContainer');
    editFormContainer.innerHTML = "";

    const editForm = document.createElement('div');
    editForm.classList = 'editFormDiv p-3'
    const editFormContent = `
    <form class="container">
            <div class="mb-3">
                <label for="editTitle" class="form-label">Title</label>
                <input type="text" class="form-control" name="editTitle" id="editTitle" placeholder="${book.title}" value="${book.title} ">
            </div>
            <div class="mb-3">
                <label for="editAuthor" class="form-label">Author</label>
                <input type="text" class="form-control" name="editAuthor" id="editAuthor" placeholder="${book.author}" value="${book.author} " ">
            </div>
            <div class="mb-3">
                <label for="editYear" class="form-label">Year</label>
                <input type="text" class="form-control" name="editYear" id="editYear" placeholder="${book.year}" value="${book.year}">
            </div>
            <button class="btn mr-2" onclick="renderBook()">Back</button>
            <button class="btn btn-save" onclick="editBook('${book.id}')">Save</button>
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