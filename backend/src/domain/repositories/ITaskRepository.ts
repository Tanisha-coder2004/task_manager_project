import type {Task} from "../entities/Task"

const {Task:Taskclass} = require("../entities/Task");

export interface ITaskRepository{
    save(task:Task):Promise<void>
    findById(id:string):Promise<Task|null>
    findAll():Promise<Task [] | null>
    delete(id:string):Promise<void>
    create(task:Task):Promise<void>
}