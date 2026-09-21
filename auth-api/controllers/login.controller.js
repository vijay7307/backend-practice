const jwt = require("jsonwebtoken");

const validator = require("validator")

const bcrypt = require("bcrypt");

const user = require("../models/User");

const ApiError = require("../utils/apiError");

const loginUser = async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
        const error = new ApiError(404, "email and password both required");
        return next(error);
    }

    const existed_user = await user.findOne({
        email,
    });

    if (!existed_user) {
        const error = new ApiError(404, "not found!");
        return next(error);
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        existed_user.password,
    );

    if (isPasswordCorrect) {
        const token = jwt.sign(
            {
                userId: existed_user._id,
                role: existed_user.role,
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
};

module.exports = loginUser;
