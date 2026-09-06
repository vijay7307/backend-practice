const express = require("express");

const books = require("../models/Book")

const bookRouter = express.Router();

const appError = require("../utils/appError");

bookRouter.get("/", async(req, res, next) => {
    const allBooks = await books.find()
    console.log("inside get all books")
    if(!allBooks){
        const error = new appError(404, "no books found!")
        next(error);
    }
    return res.status(200).json(allBooks);
});

bookRouter.get("/:id", async (req, res, next) => {

    const book = await books.findById(req.params.id);

    if (!book) {
        const error = new appError(404, "book not found");
        return next(error);
    }

    return res.status(200).json(book);
});

bookRouter.post("/", async(req, res, next) => {
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

    const book = await books.create(req.body);

    return res.status(201).json({
        message: "new book created",
        book,
    });
});

bookRouter.patch("/:id", async(req, res, next) => {

    const book = await books.findByIdAndUpdate(
        req.params.id,
        {$set : req.body},
        {new : true}
    );

    if(!book){
        const error = new appError(404, "book not found!");
        next(error);
    }

    return res.status(200).json({
        message: "book updated successfully",
        book,
    });
});

bookRouter.delete("/:id", async(req, res, next) => {
    await books.findByIdAndDelete(req.params.id)

    return res.status(200).json({
        message: "book deleted succesfully",
    });
});

module.exports = bookRouter;
