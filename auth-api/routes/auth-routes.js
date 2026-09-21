const express = require("express")

const registerUser = require("../controllers/register.controller")

const loginUser = require("../controllers/login.controller");

const authRouter = express.Router();

authRouter.post("/register", registerUser)

authRouter.post("/login", loginUser)

module.exports = authRouter;