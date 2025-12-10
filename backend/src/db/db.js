import mongoose from "mongoose";

function connectDB(){
  mongoose.connect(process.env.mongodb_URI)
  .then(()=>{
    // console.log("MongoDb is Connected")
  })
  .catch((err)=>{
    console.log("Error - ",err)
  })
}

export default connectDB