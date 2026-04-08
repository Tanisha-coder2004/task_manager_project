import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();
export const dbConnect = async()=>{
    try {
        const connect = mongoose.connect(process.env.DATABASE_URL||'');
        console.log("db connected successfully");
        
    } catch (error) {
        console.log("error occured while connecting db ",error);
        process.exit(1)
    }
}