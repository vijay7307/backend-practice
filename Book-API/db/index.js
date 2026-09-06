const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        const connectionString = await mongoose.connect(`${process.env.MONGO_DB_URI}`)
        console.log(`\n Mongo DB CONNECTED !! MongoDb host : ${connectionString.connection.host}`)
    }catch(error){
        console.log("connection failed❌❌", error)
        process.exit(1);
    }
}

module.exports = connectDB