import ErrorHandle from './errorHandle.js';

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    // Wrong Mongodb id error
    if(err.name === "CastError"){
        const message = `Resource Not found. Invalid: ${err.path}`

        err = new ErrorHandle(message, 400)
    }

    // Mongose duplicate key error
    if(err.code == 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} is Entered`
        err = new ErrorHandle(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};