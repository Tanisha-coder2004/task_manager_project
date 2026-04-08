 export class Task{
  constructor(
    public readonly id:string,
    public title:string,
    public description:string,
    public completed:boolean = false,
  ){}

  updateTask(newTitle:string,newDescription:string){
      this.title = newTitle;
      this.description = newDescription;
  }
 toggleStatus(){
    this.completed = !this.completed
 }
}

// module.exports = {Task}