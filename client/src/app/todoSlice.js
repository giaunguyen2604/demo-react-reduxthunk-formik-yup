import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoAPI from 'api/todoAPI'

export const getTodos = createAsyncThunk("todos/getAll", async(params, thunkAPI) => {
  const dataTodos = await todoAPI.getAll()
  return dataTodos
})

export const addTodoAsync = createAsyncThunk("todos/addTodo", async(params, thunkAPI) => {
  const data = await todoAPI.addTodo(params)
  return data
  
})

export const updateTodoAsync = createAsyncThunk("todos/updateTodo", async(params, thunkAPI) => {
  const data = await todoAPI.updateTodo(params)
  return data
})

export const deleteTodoAsync = createAsyncThunk("todos/deleteTodo", async(params, thunkAPI) => {
  await todoAPI.deleteTodo(params)
  return params
})

// export const updateStatus = createAsyncThunk("todos/updateStatusTodo", async(params, thunkAPI) => {

// })

const todo = createSlice({
  name: 'todos',
  initialState: {
    data: [],
    loading: false,
    isEditMode: false,
    initTask: { id:'', task: ''}
  },
  reducers: {
    updateInitTask: (state, action) => {
      const { id, task } = action.payload
      state.initTask = {id, task}
    },
    updateIsEditMode: (state, action) => {
      const isEditMode  = action.payload
      state.isEditMode = isEditMode
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
      state.data = action.payload
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.data.push(action.payload);
    },
    [updateTodoAsync.fulfilled]: (state, action) => {
      const newTodo = action.payload;
      const todoIndex = state.data.findIndex(todo => todo.id === newTodo.id);

      if (todoIndex >= 0) {
        state.data[todoIndex] = newTodo;
      }
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      const removeTodoId = action.payload.id;
      const filterData = state.data.filter(todo => todo.id !== parseInt(removeTodoId))
      state.data = filterData;
    }
  }
});

const { reducer, actions } = todo;
export const { addTodo, removeTodo, updateTodo, updateStatus, updateInitTask, updateIsEditMode } = actions;
export default reducer;