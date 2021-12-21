import { useState, useEffect } from "react";
import { GetTodo, SubmitTodo } from "../util/Utilities";
import '../css/TodoSite.css';
export function TodoMain() {

  const [TitleInput,setTitleInput] = useState('');
  const [ContentInput, setContentInput] = useState('');
  useEffect( ()=>{
    const Callback = async() => {
      await GetTodo();
    }
    Callback(); 
  },[]);

  
  
  function addTodo(e){
      e.preventDefault();
      SubmitTodo(TitleInput, ContentInput);
      setTitleInput('');
      setContentInput('');
  }

  return (
  <div className="todo-main">
  <div className="todo-card">
   <form>
     <div>
       <input placeholder="Title" value={TitleInput} 
       onChange={(t)=>{
         setTitleInput(t.target.value);
         }}></input>
     </div>
     <div>
       <input placeholder="Content" value={ContentInput} onChange={(c)=>{
         setContentInput(c.target.value);
         }}></input>
     </div>
     <button type="submit" className="todo-add-button" onClick={addTodo}>+</button>
    </form>
    </div>
  </div>
   );
}
