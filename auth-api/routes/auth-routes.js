const express = require("express")

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const user = require("../models/User")

const ApiError = require("../utils/apiError")

const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {

    const { name, email, password } = req.body;

    if(!name || !email || !password){
        const error = new ApiError(400, "name, email and password all are required!");
        return next(error);
    }

    const existedUser = await user.findOne({ email });

    if(existedUser){
        const error = new ApiError(409, "email already exists");
        return next(error);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const endUser = await user.create({
        name,
        email,
        password : hashPassword
    })

    return res.status(201).json({
        message : "user created",
        endUser
    })

})

authRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        const error = new ApiError(404, "email and password both required");
        return next(error);
    }

    const existed_user = await user.findOne({
        email
    })

    if(!existed_user){
        const error = new ApiError(404, "not found!");
        return next(error);
    }

    const isPasswordCorrect = await bcrypt.compare(password, existed_user.password);

    if (isPasswordCorrect) {
        const token = jwt.sign(
            {
                userId: existed_user._id,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d",
            },
        );

        return res.status(200).header("Authorization", `Bearer ${token}`).json({
            message: "login successful",
        });
    } else {
        const error = new ApiError(401, "invalid password!");
        return next(error);
    }

})

module.exports = authRouter;