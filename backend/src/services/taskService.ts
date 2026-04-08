import { ITaskRepository } from "../domain/repositories/ITaskRepository";
import { Task } from "../domain/entities/Task";

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

    async deleteTask(id:string){
        const task = this.repository.findById(id);
        if(!task){
            throw new Error("Task does not exist")
        }
         await this.repository.delete(id);
    }

    async toggleTaskStatus(id: string): Promise<Task | null> {
        const task = await this.repository.findById(id);
        if (!task) throw new Error("Task not found");
        
        task.toggleStatus(); // Entity ka function use kiya
        await this.repository.save(task);
        return task;
    }

    async updateTask(id:string,title:string,description:string){
        const task = await this.repository.findById(id);
        if(!task) throw new Error("Task not found")
        task.updateTask(title,description);
       await this.repository.save(task)
      
    }
}