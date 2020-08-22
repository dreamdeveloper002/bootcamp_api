const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db')


//load env vars
dotenv.config({path: './bootcamp_api/config/config.env'});

//connect to database
 connectDB()

//Routes files
const bootcamps = require('./routes/bootcamps');


const app = express();

//Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    
    app.use(morgan('dev'));

}




//mount routers 
app.use('/api/v1/bootcamps', bootcamps);


 
const PORT = process.env.PORT || 5000;

//handle unhandled promise rejections

process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);

    //close server & exit process
    server.close(() => {
        process.exit(1)
    })
})

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));