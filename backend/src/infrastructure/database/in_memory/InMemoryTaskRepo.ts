import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { Task } from "../../../domain/entities/Task";

export class InMemoryTaskRepo implements ITaskRepository{
     private tasks: Task[] = [];

    async findById(id: string): Promise<Task | null> {
         const task = this.tasks.find(t => t.id === id);
         return task || null;
    }

    async findAll(): Promise<Task[] | null> {
         return [...this.tasks];
    }

    async create(task: Task): Promise<void> {
          this.tasks.push(task);
    }

    async delete(id: string): Promise<void> {
         this.tasks = this.tasks.filter(t => t.id !== id);
    }

    async save(task: Task): Promise<void> {
        const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    } else {
      throw new Error('Task not found');
    }
    }
}