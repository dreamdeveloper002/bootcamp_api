const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
     let error = { ...err }
    console.log(err)
    error.message = err.message
    
    console.log(error.message)
    
    //mongoose bad object id
    if(err.name === 'CastError') {

        const message = `Bootcamp not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404)
    }

    //console.log(error);
    
    res.status(error.statusCode || 500 ).json({
        success: false,
        error: error.message || 'server Error'
    });
};



module.exports = errorHandler;