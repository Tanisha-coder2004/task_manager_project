import { ITaskRepository } from "../domain/repositories/ITaskRepository";
import { Task } from "../domain/entities/Task";
import { AppError } from "../utils/AppError";

export class taskService {
    constructor(private repository:ITaskRepository){}

    async createTask(id:string,title:string,description:string):Promise<Task>{
      const newTask = new Task(id,title,description);
        await this.repository.create(newTask);
        return newTask;
    }

    async getAllTask(){
        return this.repository.findAll()
    }

    async getDashBoardStats(){
        const allTask = await this.repository.findAll()
        const total:number = allTask?.length??0;
        const completedTask:number= allTask?.filter(t=>t.completed).length??0;
        return {
            allTask,
            stats:{total,completedTask,pending:total-completedTask}
        }
        }

    async deleteTask(id:string){
        const task = this.repository.findById(id);
        if(!task){
            throw new AppError("Task does not exist",404)
        }
         await this.repository.delete(id);
    }

    async toggleTaskStatus(id: string): Promise<Task | null> {
        const task = await this.repository.findById(id);
        if (!task) throw new AppError("Task not found",404);
        
        task.toggleStatus(); // Entity ka function use kiya
        await this.repository.save(task);
        return task;
    }

    async updateTask(id:string,title:string,description:string){
        const task = await this.repository.findById(id);
        if(!task) throw new AppError("Task not found",404)
        task.updateTask(title,description);
       await this.repository.save(task)
      
    }
}