import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoAPI from 'api/todoAPI'

export const getTodos = createAsyncThunk("todos/getAll", async(params, thunkAPI) => {
  //thunkAPI.dispatch(...)
  const dataTodos = await todoAPI.getAll()
  return dataTodos
})

const todo = createSlice({
  name: 'todos',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {
    addTodo: (state, action) => {
      state.data.push(action.payload);
    },
    removeTodo: (state, action) => {
      const removeTodoId = action.payload;
      return {...state, data: state.data.filter(todo => todo.id !== removeTodoId)};
    },
    updateTodo: (state, action) => {
      const newTodo = action.payload;
      const todoIndex = state.data.findIndex(todo => todo.id === newTodo.id);

      if (todoIndex >= 0) {
        state.data[todoIndex] = newTodo;
      }
    },
    updateStatus: (state, action) => {
      const { id, checked } = action.payload
      const index = state.data.findIndex(el => el.id === id)
      if (index === -1) return;
      state.data[index].isDone = checked
    }
  },
  extraReducers:{
    [getTodos.pending]: (state) => {
      state.loading = true
    },
    [getTodos.rejected]: (state) => {
      state.loading = false
    },
    [getTodos.fulfilled]: (state, action) => {
      state.loading = false
      console.log(action)
      state.data = action.payload
    }
  }
});

const { reducer, actions } = todo;
export const { addTodo, removeTodo, updateTodo, updateStatus } = actions;
export default reducer;