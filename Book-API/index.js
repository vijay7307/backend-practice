const express = require("express");

const app = express();

const bookRoutes = require("./routes/bookRoutes")

const appError = require("./utils/appError");

app.use(express.json());

app.use("/api/books", bookRoutes);

app.use((req, res, next) => {
    const error = new appError(404, "route not found");
    next(error);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message : err.message
    })
})

app.listen(3000, () => {
    console.log("server started!")
})