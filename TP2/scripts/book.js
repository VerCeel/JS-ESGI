export class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    getDetails() {
        return `Titre : ${this.title} / Auteur : ${this.author}`;
    }
}