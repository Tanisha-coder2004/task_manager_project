import express from "express"
import dotenv from "dotenv"
import { dbConnect } from "./infrastructure/database/mongoose/dbConnect";
// import { router } from "./Routes/routes";
import { defineRoutes } from "./Routes/routes";
import { taskService } from "./services/taskService";
import { InMemoryTaskRepo } from "./infrastructure/database/in_memory/InMemoryTaskRepo";
import cors from "cors"
import { globalErrorHandler } from "./middleware/errorMiddleware";
const repo = new InMemoryTaskRepo()
const taskservice = new taskService(repo)
const Port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json())
// dbConnect();
// default route
// app.use("/",(req,res)=>{
//     res.send("Task Management Project")
// })
app.use("/api",defineRoutes(taskservice))
app.use(globalErrorHandler)
app.listen(Port,()=>{
    console.log(`SERVER CONNECTED SUCCESSFULLY ON ${Port}`)
})