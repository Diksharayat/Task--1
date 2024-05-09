const { mongoose } = require("mongoose");
var dotenv = require('dotenv');
dotenv.config()
const dbConnect=async()=>{
  try {
    await mongoose.connect(process.env.mongo_uri);
    console.log("db connected successfully");
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

dbConnect();

