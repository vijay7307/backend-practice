class appError extends Error{
    constructor(
        status,
        message = "something went wrong"
    ){
        super(message);
        this.status = status;
    }
}

module.exports = appError;