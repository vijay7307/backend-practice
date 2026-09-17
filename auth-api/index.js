const express = require("express");

const bcrypt = require("bcrypt")

const app = express();

const dotenv = require("dotenv");

const authRouter = require("./routes/auth-routes");

const protectedRoutes = require("./routes/protected-routes")

const connectDB = require("./db/index");

dotenv.config({
    path : "./.env"
})

connectDB();

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/auth", protectedRoutes);

app.use((err, req, res, next) => {
    console.log("error", err);
    res.status(err.status).json({
        message : err.message
    });
})

app.listen(3000, () => {
    console.log("server started! ✨✨✨✨");
})


