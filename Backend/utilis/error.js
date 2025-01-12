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

    // Redis Error
    if(err.name === "RedisError"){
        err = new ErrorHandle(err.message, 500)
    }

    // Wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, Try again`
        err = new ErrorHandle(message, 400)
    }

    // JWT expire error
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is Expired, Try again`
        err = new ErrorHandle(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};