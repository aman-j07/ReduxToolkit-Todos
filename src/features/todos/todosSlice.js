import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [{id:1,title:"Todo 1",completed:true},{id:2,title:"Todo 2",completed:false},{id:3,title:"Todo 3",completed:true}],
  indexEdit:-1, // used to put updated todo on required index 
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers:{
    addTodo:(state,action)=>{
        state.todos.push(action.payload)
    },
    deleteTodo:(state,action)=>{
        state.todos.splice(action.payload,1);
    },
    changeStatusTodo:(state,action)=>{
        state.todos[action.payload].completed=!state.todos[action.payload].completed;
    },
    setIndexEdit:(state,action)=>{
        state.indexEdit=action.payload;
    },
    updateTodo:(state,action)=>{
        state.todos[state.indexEdit].title=action.payload;
        state.indexEdit=-1;
    },
  }
});

export const {addTodo,deleteTodo,changeStatusTodo,setIndexEdit,updateTodo} = todosSlice.actions;
export default todosSlice.reducer;
