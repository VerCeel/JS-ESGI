import { Book } from './book.js';

export class Library {
    constructor() {
        this.books = this.loadBooks();
    }

    loadBooks() {
        const savedBooks = localStorage.getItem('libraryBooks');
        if (savedBooks) {
            const parsedBooks = JSON.parse(savedBooks);
            return parsedBooks.map(book => new Book(book.title, book.author));
        }
        return [];
    }

    saveBooks() {
        localStorage.setItem('libraryBooks', JSON.stringify(this.books));
    }

    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
            this.saveBooks();
            return true;
        }
        return false;
    }

    listBooks() {
        return this.books.map(book => book.getDetails());
    }

    findBookByTitle(title) {
        const foundBook = this.books.find(book => book.title === title);
        return foundBook ? foundBook.getDetails() : "Livre non trouvé";
    }
}