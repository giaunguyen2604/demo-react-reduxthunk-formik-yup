import { useState} from 'react'
import { Container } from 'reactstrap'
import ListTasks from './components/ListTasks'
import FormAddEdit from './components/FormAddEdit'
import { listTodos } from './data'
import './App.css';

function App() {

  const [listTasks, setListTasks] = useState(listTodos)

  const initialValues =
  {
    task: ''
  }

  const submitAddEdit = (values, actions) => {
    setTimeout(() => {
      const newListTodos = [...listTasks]
      newListTodos.push({
        id: Date.now(),
        value: values.task,
        isDone: false
      })
      setListTasks(newListTodos)
      actions.setSubmitting(false);
      actions.resetForm({
        values: {
          task: ''
        }
      })
    }, 500)
  }

  const changeStatus = (id, checked) => {
    const newListTodos = [...listTasks]
    const index = newListTodos.findIndex(el => el.id === id)
    if (index === -1) return;
    newListTodos[index].isDone = checked
    setListTasks(newListTodos)
  }

  return (
    <Container className="themed-container container-app">
      <h1 className="header-title">List Todos</h1>
      <FormAddEdit isAdd={true} onSubmit={submitAddEdit} initialValues={initialValues}/>
      <ListTasks listTasks={listTasks} updateStatus={changeStatus}/>
    </Container>
  );
}

export default App;
