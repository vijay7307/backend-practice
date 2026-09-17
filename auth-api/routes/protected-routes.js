const express = require("express");
const authenticate = require("../middlewares/auth.middleware")
const authorize = require("../middlewares/authorize.middleware")
const viewProfile = require("../controllers/profile.controller")
const admin = require("../controllers/admin.controller")

const Router = express.Router();

Router.get("/profile", authenticate, authorize("admin", "user"), viewProfile)

Router.get("/admin", authenticate, authorize("admin"), admin)

module.exports = Router;