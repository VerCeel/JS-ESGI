import { Book } from './book.js';
import { Library } from './library.js';

const myLibrary = new Library();

const addBookForm = document.getElementById('add-book-form');
const listBooksBtn = document.getElementById('list-books-btn');
const searchBookForm = document.getElementById('search-book-form');
const booksList = document.getElementById('books-list');
const searchResult = document.getElementById('search-result');

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    
    if (title && author) {
        const newBook = new Book(title, author);
        myLibrary.addBook(newBook);
        addBookForm.reset();
        alert('Livre ajouté avec succès!');
    } else {
        alert('Veuillez remplir tous les champs');
    }
});

listBooksBtn.addEventListener('click', () => {
    const books = myLibrary.listBooks();
    booksList.innerHTML = '';
    
    if (books.length === 0) {
        booksList.innerHTML = '<p>Aucun livre dans la bibliothèque</p>';
    } else {
        const ul = document.createElement('ul');
        books.forEach(bookDetails => {
            const li = document.createElement('li');
            li.textContent = bookDetails;
            ul.appendChild(li);
        });
        booksList.appendChild(ul);
    }
});

searchBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTitle = document.getElementById('search-title').value;
    
    if (searchTitle) {
        const result = myLibrary.findBookByTitle(searchTitle);
        searchResult.textContent = result;
        searchBookForm.reset();
    } else {
        alert('Veuillez entrer un titre à rechercher');
    }
});