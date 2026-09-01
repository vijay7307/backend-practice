const express = require("express");

const app = express();

const studentRoutes = require("./routes/studentRoutes")

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method)
    console.log(req.url)
    next()
})

app.use((req, res, next) => {
    const startTime = process.hrtime.bigint();

    res.on("finish", () => {
        const endTime = process.hrtime.bigint();
        const duration = Number(endTime - startTime) / 1e6;
        console.log(`${req.method} ${req.url} - ${duration.toFixed(2)}ms`);
    })

    next()
})

app.use("/api/students", studentRoutes)

app.listen(3000, () => {
    console.log("server started!");
});