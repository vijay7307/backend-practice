const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        const error = new ApiError(401, "you are not authorized to watch the content here");
        return next(error);
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("error occured during token varification : ", err);
        const error = new ApiError(401, "invalid or expired token");
        return next(error);
    }
}

module.exports = authenticate;