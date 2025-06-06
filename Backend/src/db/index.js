import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`MONGODB_URI/${DB_NAME}`)
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB FAILED", error) ;
        process.exit(1);
    }
}

export default connectDB;
