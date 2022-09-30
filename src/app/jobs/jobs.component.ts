import { ITask } from './../model/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  todoForm !: FormGroup;
  open: ITask [] = [];
  contacted : ITask [] = [];
  done : ITask [] = [];
  updateIndex!:any;
  isEditEnabled : boolean = false;
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
       item : ['', Validators.required]
    })
  }
  addTask(){
    this.open.push({
      description:this.todoForm.value.item,
      done:false
    });
    this.todoForm.reset();
  }
  onEdit(item:ITask, i : number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }
  updateTask(){
    this.open[this.updateIndex].description = this.todoForm.value.item;
    this.open[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false
  }
  deleteOpen(i: number){
    this.open.splice(i,1)
  }
  deleteContactedTask(i: number){
    this.contacted.splice(i,1)
  }
  deleteDoneTask(i: number){
    this.done.splice(i,1)
  }


  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
