const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware")

const user = require("../models/User")

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message : "everything is working perfectly"
    })
})

module.exports = router;