import { useEffect, useState} from 'react'
import { Container } from 'reactstrap'
import ListTasks from 'components/ListTasks'
import FormAddEdit from 'components/FormAddEdit'
import { useAppContext } from 'contexts/appContext' 
import { listTodos } from './data'
import './App.css';
function App() {
  const { initTask, isEditMode, updateIsEditMode, idItemDelete } = useAppContext()
  const [listTasks, setListTasks] = useState(listTodos)

  const initialValues =
  {
    id: initTask.id,
    task: initTask.value
  }

  const submitAddEdit = (values, actions) => {
    const { task, id} = values
    setTimeout(() => {
      let newListTodos = [...listTasks]
      if (!isEditMode) {
        newListTodos.push({
          id: Date.now(),
          value: values.task,
          isDone: false
        })
      } else {
        const index = newListTodos.findIndex(todo => todo.id === id)
        if (index === -1) return;
        newListTodos[index].value = task
        updateIsEditMode(false)
      }
      
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

  useEffect(() => {
    if (idItemDelete) {
      const newListTodos = [...listTasks].filter(todo => todo.id !== idItemDelete)
      setListTasks(newListTodos)
    }
    // eslint-disable-next-line
  }, [idItemDelete])

  return (
    <Container className="themed-container container-app">
      <h1 className="header-title">List Todos</h1>
      <FormAddEdit onSubmit={submitAddEdit} initialValues={initialValues}/>
      <ListTasks listTasks={listTasks} updateStatus={changeStatus} />
    </Container>
  );
}

export default App;
