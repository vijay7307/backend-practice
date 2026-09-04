class AppError extends Error{
    constructor(
        status,
        message = "something went wrong"
    ){
        super(message);
        this.status = status;
    }
}

module.exports = AppError;