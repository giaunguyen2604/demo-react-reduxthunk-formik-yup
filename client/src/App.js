import React from 'react'
import { Container } from 'reactstrap'
import ListTasks from 'components/ListTasks'
import FormAddEdit from 'components/FormAddEdit'
import { useAppContext } from 'contexts/appContext'
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, updateTodo } from './app/todoSlice'
import todoAPI from 'api/todoAPI'
import './App.css';

function App() {
  const { initTask, isEditMode, updateIsEditMode } = useAppContext()
  const listTodos = useSelector(state => state.todos)
  const dispatch = useDispatch();
  const initialValues =
  {
    id: initTask.id,
    task: initTask.value
  }

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
        updateIsEditMode(false)
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
    async function fetchData() {
      const response = await todoAPI.getAll()
    }
    fetchData()
  },[])

  return (
    <Container className="themed-container container-app">
      <h1 className="header-title">List Todos</h1>
      <FormAddEdit onSubmit={submitAddEdit} initialValues={initialValues} />
      <ListTasks listTasks={listTodos}/>
    </Container>
  );
}

export default App;
