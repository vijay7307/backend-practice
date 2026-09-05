const express = require("express");

const bookRouter = express.Router();

const appError = require("../utils/appError");

const books = [
    {
        id: 1,
        title: "herry potter",
        author: "J.K.Rowling",
        price: 500,
        genre: "fiction",
    }
];

bookRouter.get("/", (req, res) => {
    return res.status(200).json(books);
});

bookRouter.get("/:id", (req, res, next) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        const error = new appError(400, "id is invalid");
        return next(error);
    }

    const book = books.find((book) => {
        return book.id === id;
    });

    if (!book) {
        const error = new appError(404, "not found");
        return next(error);
    }

    return res.status(200).json(book);
});

bookRouter.post("/", (req, res, next) => {
    const { title, author, price, genre } = req.body;
    if (!title || !author || !price || !genre) {
        const error = new appError(
            400,
            "title, author, price, genre all are required",
        );
        return next(error);
    }
    if (Number.isNaN(price)) {
        const error = new appError(400, "price is invalid");
        return next(error);
    }
    const id = books.length + 1;
    const book = {
        id: id,
        title,
        author,
        price,
        genre,
    };

    books.push(book);

    return res.status(201).json({
        message: "new book created",
        book,
    });
});

bookRouter.patch("/:id", (req, res, next) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        const error = new appError(400, "id is invalid");
        return next(error);
    }

    const book = books.find((book) => {
        return book.id === id;
    });

    const { title, author, price, genre } = req.body;

    if (title !== undefined) {
        book.title = title;
    }
    if (author !== undefined) {
        book.author = author;
    }
    if (price !== undefined) {
        if (Number.isNaN(price)) {
            const error = new appError(400, "price is invalid");
            return next(error);
        }
        book.price = price;
    }
    if (genre !== undefined) {
        book.genre = genre;
    }
    return res.status(200).json({
        message: "book updated successfully",
        book,
    });
});

bookRouter.delete("/:id", (req, res, next) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        const error = new appError(400, "id is invalid");
        return next(error);
    }

    const book = books.find((book) => {
        return book.id === id;
    });

    if (!book) {
        const error = new appError(404, "not found");
        return next(error);
    }

    books.pop(book);
    return res.status(200).json({
        message: "book deleted succesfully",
    });
});

module.exports = bookRouter;
