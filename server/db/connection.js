require("dotenv").config()
const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB is connected");
    } catch (error) {
        console.log("MongoDB is not connected");
        console.log(error.message);
        process.exit(1)
    }
}

module.exports = connectDB