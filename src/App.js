import React, { Component } from 'react';
import './App.css';
//import child component to parent component
import { TodoBanner } from './TodoBanner';
import { TodoRow } from './TodoRow';
import { TodoCreater } from './TodoCreater';
import { VisibilityControl } from './VisibilityControl';

//Adding dynamic data to our react app
export default class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state=
    {
      userName : "Purnanand",
      todoItems : [
      {action:"Buy flowers", done:false},
      {action:"Do workout" , done:true},
      {action:"Study programming" , done:false},
      {action:"Call a friend" , done:true}],
      showCompleted :true
    }
  }

  updateNewTextValue = (event) =>
  {
    this.setState({ newItemText: event.target.value });
  }

  createNewTodo = (task) =>
  {
    if(!this.state.todoItems
      .find(item => item.action === task))
    {
      this.setState({
        todoItems: [ ...this.state.todoItems,{action: task , done:false}]},
      () => localStorage.setItem("todos",
                                 JSON.stringify(this.state)));
    
  }
}
 
  toggleTodo = (todo) => this.setState
  ({ todoItems: this.state.todoItems.map
    (item => item.action === todo.action ? 
      {...item,done: !item.done}:item)});
tableTodoRows = (doneValue) => this.state.todoItems
.filter(item => item.done === doneValue)
.map(
  item => <TodoRow key= {item.action} item={item} callback={this.toggleTodo} />)
    


//load /get our kept data
ComponentDidMount =() =>
{
  let data = localStorage.getItem("todos");
  this.setState(data != null ? JSON.parse(data):
  {
    userName : "Purnanand",
    todoItems : [
    {action:"Buy flowers", done:false},
    {action:"Do workout" , done:true},
    {action:"Study programming" , done:false},
    {action:"Call a friend" , done:true}],
    showCompleted : true
    });
}



  render = () =>
    <div>
     <TodoBanner  name={this.state.userName} task={this.state.todoItems} />
         <div className="container-fluid">
          <TodoCreater callback={this.createNewTodo} />
     <table className="table table-striped table-bordered">
       <thead>
         <tr>
           <th>Todo Task Name</th>
           <th>Done</th>
         </tr>
       </thead>
       <tbody>
         {/*Show incomplete task*/}
         {this.tableTodoRows(false)}
       </tbody>
     </table>
     <div className="bg-danger text-white text-center p-2">
          {/* Calling child cpmponent */}
          <VisibilityControl description="Completed Tasks"
          isChecked={this.state.showCompleted}
          callback={(checked)=> this.setState({ showCompleted: checked})}/>
     </div>
     {
       this.state.showCompleted &&
       <table className="table table-striped table-bordered">
         <thead>
           <tr>
             <td>Task Name </td><td>Status</td>
           </tr>
         </thead>
         <tbody>
            {/*Show Completed tasks*/}
         {this.tableTodoRows(true)}
         </tbody>
       </table>
     }
    </div>
    </div>
 
}
