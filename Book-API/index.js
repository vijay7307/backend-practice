const express = require("express");

const app = express();

const dotenv = require("dotenv")

const connectDB = require("./db/index");

const bookRoutes = require("./routes/bookRoutes")

const mainError = require("./middleware/errorMiddleware")

const appError = require("./utils/appError");

dotenv.config({
    path: "./.env",
});

connectDB();

app.use(express.json());

app.use("/api/books", bookRoutes);

app.use((req, res, next) => {
    const error = new appError(404, "route not found");
    next(error);
})

app.use(mainError);

app.listen(3000, () => {
    console.log("server started!")
})