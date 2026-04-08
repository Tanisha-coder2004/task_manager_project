import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { Task } from "../../../domain/entities/Task";
import {taskModel} from "./taskModel";

export class MongoTaskRepo implements ITaskRepository{
    async findById(id: string): Promise<Task | null> {
        const doc = await taskModel.findById(id);
        if(!doc){
            return null;
        }
        return new Task(
            doc._id.toString(),
            doc.title,
            doc.description,
            doc.completed
        )
    }
    async findAll(): Promise<Task[] | null> {
        const docs = await taskModel.find();
        return docs.map(doc=>new Task(
            doc._id.toString(),
            doc.title,
            doc.description,
            doc.completed
        ))
    }
    async save(task: Task): Promise<void> {
        await taskModel.findByIdAndUpdate(
           task.id,
           {
            title:task.title,
            description:task.description,
            completed:task.completed
           }
        )
    }
    async delete(id: string): Promise<void> {
        await taskModel.deleteOne({ _id: id });
    }

    async create(task:Task):Promise<void>{
        await taskModel.create({
            _id:task.id,
            title:task.title,
            description:task.description,
            completed:task.completed
        })
    }
}