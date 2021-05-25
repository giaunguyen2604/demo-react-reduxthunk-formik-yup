import React from 'react'
import PropTypes from 'prop-types'
import { Input, Col, Button, Row} from 'reactstrap'
import { useDispatch } from 'react-redux';
import { removeTodo, updateStatus, updateInitTask, updateIsEditMode } from 'app/todoSlice'

const ItemTask = props => {
  const dispatch = useDispatch();
  const { value, isDone, id } = props
  
  const changeStatus = (e, id) => {
    const { checked } = e.target 
    dispatch(updateStatus({id, checked}))
  }

  const editTodoItem = () => {
    dispatch(updateInitTask({id, task: value}))
    dispatch(updateIsEditMode(true))
    
    //focus input
    const elInput = document.getElementById('task')
    if (elInput) elInput.focus()
  }

  const deleteTodoItem = () => {
    // updateIdItemDelete(id)
    dispatch(removeTodo(id))
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
  isDone: PropTypes.bool
}

export default ItemTask
