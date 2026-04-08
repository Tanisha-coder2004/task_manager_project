
import { taskService } from "../services/taskService";
import { ITaskRepository } from "../domain/repositories/ITaskRepository";
import { MongoTaskRepo } from "../infrastructure/database/mongoose/MongoTaskRepo";
import { Request, Response } from "express";
import { InMemoryTaskRepo } from "../infrastructure/database/in_memory/InMemoryTaskRepo";


export class TaskController {
    constructor(private TaskService: taskService) {}


    createTask = async (req: Request, res: Response) => {
        
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).json({
                    success: false,
                    message: "kindly fill all field"
                })
            }
           
            const createdTask = await this.TaskService.createTask(Date.now().toString(), title, description);
            return res.status(200).json({
                success: true,
                message: "task created successfully",
                createdTask
            })
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }


    deleteTask = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            console.log("Deleting task with ID:", id);
           
            const result = await this.TaskService.deleteTask(id);
            console.log("Delete result:", result);

            return res.status(200).json({
                success: true,
                message: "deleted successfully",
                id
            })

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }


    updateTask = async (req: Request, res: Response) => {
        try {
             const {id} = req.params as { id: string };
            const { title, description } = req.body;
            console.log("id : ",id)
            console.log("title : ",title)
           
            await this.TaskService.updateTask(id, title, description);
            return res.status(200).json({
                success: true,
                message: "task updated successfully"
            })

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }



    getAllTask = async (req: Request, res: Response) => {
        try {
           
            const allTask = await this.TaskService.getAllTask();
            const total: number = allTask?.length ?? 0;
            const completedTask: number = allTask?.filter(task => task.completed).length ?? 0;
            const pending = total - completedTask;
            return res.status(200).json({
                success: true,
                message: "returned all task",
                stats: { total, completedTask, pending },
                allTask
            })
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }



    toggleTaskStatus = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as {id:string};
            
            const task = await this.TaskService.toggleTaskStatus(id);
            return res.status(200).json({
                success: true,
                message: "status marked",
                task
            })

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}








