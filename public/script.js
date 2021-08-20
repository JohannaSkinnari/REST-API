window.addEventListener('load', main);

const books = [];

async function main() {
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
    console.log({listContainer})
    listContainer.innerHTML = "";
    console.log({books});
    console.log('books.length: ', books.length)
    books.forEach((book) =>  {
        console.log(book)
        const bookItem = document.createElement('div');
        bookItem.className = 'bookItem';
        const bookContent = 
        `<h5>${book.title}</h5>
        <div>Author: ${book.author}</div>
        <div>Year: ${book.year}</div>
        <button>Delete</button>
        <button>Edit</button>`
        bookItem.innerHTML = bookContent;
        listContainer.append(bookItem);
    });
}
