const ApiError = require("../utils/apiError")

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            const error = new ApiError(
                403,
                "you are not authorized to do this task",
            );
            return next(error);
        }
        console.log("yes you are allowed");
        next();
    }
}

module.exports = authorize;