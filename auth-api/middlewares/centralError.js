const centralError = (err, req, res, next) => {
    console.log("error", err);
    res.status(err.status || 500).json({
        message: err.message || "internal server error",
    });
};

module.exports = centralError;