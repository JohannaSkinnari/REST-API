window.addEventListener('load', main);

let books = [];
let book = {};

async function main() {
    // await loadBooks();
    // renderBooks();
    await loadBook("34b26b00-018c-11ec-9d0f-2b955942d1c4");
    renderBook();
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
        `<h5>${book.title}</h5>
        <div>Author: ${book.author}</div>
        <div>Year: ${book.year}</div>
        <button>Details</button>
        <button>Delete</button>
        <button>Edit</button>`
        bookItem.innerHTML = bookContent;
        listContainer.append(bookItem);
    });
}


async function loadBook(id) {
    const response = await fetch('http://localhost:3000/api/books/' + id);
    book = await response.json();

    return book;
}

function renderBook() {
    const listContainer = document.querySelector('.listContainer');
    listContainer.innerHTML = "";
    const bookItem = document.createElement('div');
    bookItem.className = 'bookItem';
    const bookContent = 
    `<h5>${book.title}</h5>
    <div>Author: ${book.author}</div>
    <div>Year: ${book.year}</div>
    <button>Back</button>
    <button>Delete</button>
    <button>Edit</button>`
    bookItem.innerHTML = bookContent;
    listContainer.append(bookItem);
}
