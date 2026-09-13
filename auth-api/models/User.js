const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase : true,
        trim: true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 8
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;