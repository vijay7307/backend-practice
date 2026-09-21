const bcrypt = require("bcrypt");

const user = require("../models/User");

const ApiError = require("../utils/apiError");

const registerUser = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        const error = new ApiError(
            400,
            "name, email, role and password all are required!",
        );
        return next(error);
    }

    const existedUser = await user.findOne({ email });

    if (existedUser) {
        const error = new ApiError(409, "email already exists");
        return next(error);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    if (!validator.isEmail(email)) {
        const error = new ApiError(400, "invalid email format");
        return next(error);
    }

    const endUser = await user.create({
        name,
        email,
        password: hashPassword,
        role,
    });

    return res.status(201).json({
        message: "user created",
        endUser,
    });
};

module.exports = registerUser;
