import React from 'react'
import PropTypes from 'prop-types'
import { Input, Col, Button, Row} from 'reactstrap'

const ItemTask = props => {
  const { value, isDone, updateStatus, id } = props

  const changeStatus = (e, id) => {
    const { checked } = e.target 
    updateStatus(id, checked)
  }

  return (
   <Row className="item-task">
     <Col md="6">
       <Input type='checkbox' checked={isDone} onChange={(e) => changeStatus(e, id) }/>
       <span className="value-task">{value}</span>
     </Col>
     <Col md="6" className="btn-control-task">
       <Button color='primary'><i className="fa fa-pen fa-sm"/></Button>
       <Button color='danger' className="ml-btn"><i className="fa fa-trash fa-sm"/></Button>
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
