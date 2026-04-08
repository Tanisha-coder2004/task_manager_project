import express from "express";
// import { createTask , deleteTask , updateTask , getAllTask , toggleTaskStatus} from "../controllers/taskController";
import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { taskService } from "../services/taskService";


export const defineRoutes = (taskservice: taskService): Router => {
    const router = Router();
    const taskController = new TaskController(taskservice);
    router.post("/v1/createTask", taskController.createTask);
    router.delete("/v1/deleteTask/:id", taskController.deleteTask);
    router.put("/v1/updateTask/:id", taskController.updateTask);
    router.get("/v1/getAllTask", taskController.getAllTask);
    router.post("/v1/toggleStatus/:id", taskController.toggleTaskStatus)

    return router;
};