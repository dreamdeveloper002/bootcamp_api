const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');



//load env vars
dotenv.config({path: '/Users/mac/Desktop/bootcamp_api/config/config.env'});


//load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');



//connect to DB

 mongoose.connect(process.env.LOCAL_DEV_MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true

});

//read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, `utf-8`));

//read JSON files
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, `utf-8`));


// Import into DB

const importData = async () => {

    try {
        
        await Bootcamp.create(bootcamps);
        //await Course.create(courses);
        console.log('Data Imported.....'.green.inverse);
        process.exit();
    
    } catch (err) {
        
        console.error(err);
    }
}

//Delete Data

const deleteData = async () => {

    try {
        
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log('Data Destroyed.....'.red.inverse);
        process.exit();
    
    } catch (err) {
        
        console.error(err);
    }
}



if(process.argv[2] === '-i') {

    importData();
} else if (process.argv[2] === '-d') {

    deleteData();
}