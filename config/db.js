const mongoose = require('mongoose');

const connectDB = async () => {

const mongoUri = process.env.LOCAL_DEV_MONGO_URI 
   const conn = await mongoose.connect(mongoUri,{
  
       useNewUrlParser: true,
       useCreateIndex: true,
       useCreateIndex: true, 
       useUnifiedTopology: true
   })


   console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold)
}


module.exports = connectDB;