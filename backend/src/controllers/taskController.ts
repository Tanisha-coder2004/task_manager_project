
import { taskService } from "../services/taskService";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export class TaskController {
    constructor(private TaskService: taskService) {}


    createTask = async (req: Request, res: Response,next:NextFunction) => {
        
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                // return res.status(400).json({
                //     success: false,
                //     message: "kindly fill all field"
                // })
                next(new AppError("Kindly fill all field",400))
            }
           
            const createdTask = await this.TaskService.createTask(Date.now().toString(), title, description);
            return res.status(200).json({
                success: true,
                message: "task created successfully",
                createdTask
            })
        } catch (error: any) {
            next(error)
        }
    }


    deleteTask = async (req: Request, res: Response,next:NextFunction) => {
        try {
            const { id } = req.params as { id: string };
            console.log("Deleting task with ID:", id);
           
            const result = await this.TaskService.deleteTask(id);
            // console.log("Delete result:", result);

            return res.status(200).json({
                success: true,
                message: "deleted successfully",
                id
            })

        } catch (error: any) {
            next(error)
        }
    }


    updateTask = async (req: Request, res: Response,next:NextFunction) => {
        try {
             const {id} = req.params as { id: string };
            const { title, description } = req.body;
            await this.TaskService.updateTask(id, title, description);
            return res.status(200).json({
                success: true,
                message: "task updated successfully"
            })

        } catch (error: any) {
            next(error)
        }
    }



    getAllTask = async (req: Request, res: Response,next:NextFunction) => {
        try {
           
            const allTask = await this.TaskService.getAllTask();
            const dashboardData = await this.TaskService.getDashBoardStats();
             res.status(200).json({
                success:true,
                ...dashboardData
             })
        } catch (error: any) {
            next(error)
        }
    }



    toggleTaskStatus = async (req: Request, res: Response,next:NextFunction) => {
        try {
            const { id } = req.params as {id:string};
            
            const task = await this.TaskService.toggleTaskStatus(id);
            return res.status(200).json({
                success: true,
                message: "status marked",
                task
            })

        } catch (error: any) {
            next(error)
        }
    }
}








