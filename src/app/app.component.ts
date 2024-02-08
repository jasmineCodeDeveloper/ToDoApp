import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodoModel } from './models/todo.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //title = 'frontend';
  todos: TodoModel[]=[];
  work:string="";
  updateModel:TodoModel=new TodoModel();
  apiUrl: string="http://localhost:5000/api";
  
//api istekleri için gerekli
  constructor(
    private _http:HttpClient
  ){
    this.getAll();
  }

  getAll(){
    this._http.get<TodoModel[]>(this.apiUrl+"/getall").subscribe(res=>{
      this.todos=res;
    });
  }

  add(){
    let model={"work":this.work};
    this._http.post<any>(this.apiUrl+"/add",model).subscribe(res=>{
      this.getAll();

    });
  }
  delete(model: TodoModel){
    this._http.post<any>(this.apiUrl+"/delete",model).subscribe(res=>{
        this.getAll();
    });
  }
  get(model:TodoModel){

    this.updateModel={...model};
  }
  update(){

    this._http.post<any>(this.apiUrl+"/update",this.updateModel).subscribe(res=>{

      this.getAll();
    })
  }
}
