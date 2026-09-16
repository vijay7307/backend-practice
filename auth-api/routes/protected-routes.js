const express = require("express");
const authenticate = require("../middlewares/auth.middleware")
const authorize = require("../middlewares/authorize.middleware")

const Router = express.Router();

Router.get("/admin", authenticate, authorize("admin"), (req, res) => {
    console.log("now admin only do task at this route");
    res.status(200).json({
        message : "this is only admins space"
    })
})

module.exports = Router;