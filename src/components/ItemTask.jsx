import React from 'react'
import PropTypes from 'prop-types'
import { Input, Col, Button, Row} from 'reactstrap'
import { useAppContext } from '../contexts/appContext'
const ItemTask = props => {
  const { value, isDone, updateStatus, id } = props
  const { updateInitTask, updateIsEditMode, updateIdItemDelete} = useAppContext()
  
  const changeStatus = (e, id) => {
    const { checked } = e.target 
    updateStatus(id, checked)
  }

  const editTodoItem = () => {
    updateInitTask({id, value})
    updateIsEditMode(true)

    //focus input
    const elInput = document.getElementById('task')
    if (elInput) elInput.focus()
  }

  const deleteTodoItem = () => {
    updateIdItemDelete(id)
  }

  return (
   <Row className="item-task">
     <Col md="6">
       <Input type='checkbox' checked={isDone} onChange={(e) => changeStatus(e, id) }/>
       <span className="value-task">{value}</span>
     </Col>
     <Col md="6" className="btn-control-task">
       <Button color='primary' onClick={editTodoItem}><i className="fa fa-pen fa-sm"/></Button>
       <Button color='danger' className="ml-btn" onClick={deleteTodoItem}><i className="fa fa-trash fa-sm"/></Button>
     </Col>
   </Row>
  )
}

ItemTask.propTypes = {
  value: PropTypes.string,
  isDone: PropTypes.bool,
  updateStatus: PropTypes.func
}

export default ItemTask
