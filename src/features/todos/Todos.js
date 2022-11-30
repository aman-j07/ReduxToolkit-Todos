import {React,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './Todos.module.css'
import {addTodo,deleteTodo,changeStatusTodo,setIndexEdit,updateTodo} from './todosSlice'


const Todos = () => {
  const state=useSelector(state=>state)
  const dispatch=useDispatch(); 
  const refTitle = useRef();
  const refBtn=useRef();

  const editTodo=(i)=>{
    refTitle.current.value=state.todosReducer.todos[i].title;
    refBtn.current.innerText="Update"
    dispatch(setIndexEdit(i))
  }
  const addTodoStart=()=>{
    if(refBtn.current.innerText==="Add"){
      let obj={id:state.todosReducer.todos.length+1,title:refTitle.current.value,completed:false};
      dispatch(addTodo(obj))
      refBtn.current.innerText="Update";
    }
    else if(refBtn.current.innerText==="Update"){
      dispatch(updateTodo(refTitle.current.value));
      refBtn.current.innerText="Add";
    }
    refTitle.current.value='';
  }

  return (
    <div id={style.todoDiv}>
      <div id={style.inputCover}>
        <input ref={refTitle} name="todo" placeholder="Add Todo..." />
        <button onClick={addTodoStart} ref={refBtn} id={style.btnSubmit}>Add</button>
      </div>
      <ul className={style.todoList}>
        {state.todosReducer.todos.map((item,i) => {
          return (
            <li className={style.todoLi} key={item.id}>
              <p className={style.listTitle}><input type="checkbox" onChange={()=>{dispatch(changeStatusTodo(i))}} checked={item.completed} />{item.title}</p>
              <div><button className={style.btnLists} onClick={()=>editTodo(i)}>Edit</button>
              <button className={style.btnLists} onClick={()=>{dispatch(deleteTodo(i))}}>Delete</button></div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default Todos