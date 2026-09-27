const express = require("express");
const Router = express.Router();

const Book = require("../models/Book");

Router.get("/book", async (req, res) => {
    try {
        const { title, author } = req.query;

        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        // Build filter
        const filter = {
            $or: []
        };

        if (title) {
            filter.$or.push({
                title: {
                    $regex: title,
                    $options: "i"
                }
            });
        }

        if (author) {
            filter.$or.push({
                author: {
                    $regex: author,
                    $options: "i"
                }
            });
        }

        // If neither title nor author is provided,
        // remove $or because we want all books.
        if (!title && !author) {
            delete filter.$or;
        }

        const books = await Book.find(filter)
            .skip(skip)
            .limit(limit);

        const totalBooks = await Book.countDocuments(filter);

        const totalPages = Math.ceil(totalBooks / limit);

        return res.status(200).json({
            books,
            pagination: {
                currentPage: page,
                limit,
                totalBooks,
                totalPages
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = Router;
