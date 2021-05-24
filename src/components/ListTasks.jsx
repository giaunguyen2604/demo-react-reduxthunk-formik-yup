import React from 'react'
import PropTypes from 'prop-types'
import ItemTask from 'components/ItemTask'

const ListTasks = props => {
  const { listTasks, updateStatus } = props

  const changeStatus = (id, checked) => {
    updateStatus(id,checked)
  }

  return (
    <div className="list-tasks">
      {
        listTasks && listTasks.map((task, index) => {
          return <ItemTask 
          key={index} 
          id={task?.id} 
          value={task?.value} 
          isDone={task?.isDone}
          updateStatus={changeStatus}/>
        })
      }
    </div>
  )
}

ListTasks.propTypes = {
  listTasks : PropTypes.array,
  updateStatus: PropTypes.func,
}

export default ListTasks
