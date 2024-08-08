import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const url= process.env.MONGOOSE_URL;

export const connectDB= async ()=>{
    try {
        await mongoose.connect(url).then((data)=>{
            console.log("Database connected");
        })
    } catch (error) {
        console.log(error.message);
        setTimeout(connectDB,3000)
    }

}