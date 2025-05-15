import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from "dotenv"
import {app} from "./app.js"

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(8000 , ()=>{
        console.log(`Server is at port 8000`);
    })
})
.catch((err)=>{
    console.log("DB failed !!!" , err);
})

