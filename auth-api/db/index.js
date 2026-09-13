const mongoose = require("mongoose");

async function connectDB(){
    try{
        const connectionstring = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("db connected succesfully ✅✅", connectionstring.connection.host);
    }
    catch(error){
        console.log("db not connected the error : ", error);
        process.exit(1)
    }
}

module.exports = connectDB;