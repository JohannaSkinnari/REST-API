window.addEventListener('load', main);

const books = [];

function main() {
    laodBooks();
    // renderBooks();
}

async function laodBooks() {
    const response = await fetch('http://localhost:3000/api/books');
    const data = await response.json();
    for (const book of data){
        books.push(book);
    }
    return books;
}

// function renderBooks() {
//     const listContainder = document.querySelector('listContainer');
//     listContainder.innerHTML = "";
//     books.forEach(function(book) {
//         const bookItem = document.createElement('li');
//         bookItem.className = 'bookItem';
//         const bookContent = createElement(book);
//         bookItem.innerHTML = bookContent;
//         listContainder.append(bookItem);
//     })
// }
