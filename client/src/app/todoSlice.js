import { createSlice } from '@reduxjs/toolkit';
import { listTodos } from 'data'
const initialTodo = listTodos

const todo = createSlice({
  name: 'todos',
  initialState: initialTodo,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      const removeTodoId = action.payload;
      return state.filter(todo => todo.id !== removeTodoId);
    },
    updateTodo: (state, action) => {
      const newTodo = action.payload;
      const todoIndex = state.findIndex(todo => todo.id === newTodo.id);

      if (todoIndex >= 0) {
        state[todoIndex] = newTodo;
      }
    },
    updateStatus: (state, action) => {
      const { id, checked } = action.payload
      const index = state.findIndex(el => el.id === id)
      if (index === -1) return;
      state[index].isDone = checked
    }
  }
});

const { reducer, actions } = todo;
export const { addTodo, removeTodo, updateTodo, updateStatus } = actions;
export default reducer;