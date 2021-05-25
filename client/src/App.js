import React from 'react'
import { Container } from 'reactstrap'
import ListTasks from 'components/ListTasks'
import FormAddEdit from 'components/FormAddEdit'
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, updateTodo, getTodos, updateIsEditMode } from './app/todoSlice'
import './App.css';

function App() {
  const isEditMode = useSelector(state => state.todos.isEditMode)
  const listTodos = useSelector(state => state.todos?.data)
  const dispatch = useDispatch();
 
  const submitAddEdit = (values, actions) => {
    const { task, id } = values
    setTimeout(() => {
      if (!isEditMode) {
        const payload = {
          id: Date.now(),
          value: values.task,
          isDone: false
        }
        dispatch(addTodo(payload))
      } else {
        dispatch(updateTodo({id, value: task}))
        dispatch(updateIsEditMode(false))
      }
      actions.setSubmitting(false);
      actions.resetForm({
        values: {
          task: ''
        }
      })
    }, 500)
  }

  React.useEffect( () => {
    dispatch(getTodos())
    // eslint-disable-next-line
  },[])

  return (
    <Container className="themed-container container-app">
      <h1 className="header-title">List Todos</h1>
      <FormAddEdit onSubmit={submitAddEdit}/>
      <ListTasks listTasks={listTodos}/>
    </Container>
  );
}

export default App;
