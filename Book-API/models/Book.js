const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 50
    },
    author : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 20
    },
    price : {
        type : Number,
        required : true,
        min : 100
    },
    genre : {
        type : String,
        enum : ["fiction", "nonFiction"]
    }
})

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;