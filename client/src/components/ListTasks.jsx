import React from 'react'
import PropTypes from 'prop-types'
import ItemTask from 'components/ItemTask'

const ListTasks = props => {
  const { listTasks } = props

  return (
    <div className="list-tasks">
      {
        listTasks && listTasks.map((task, index) => {
          return <ItemTask 
          key={index} 
          id={task?.id} 
          value={task?.value} 
          isDone={task?.isDone}/>
        })
      }
    </div>
  )
}

ListTasks.propTypes = {
  listTasks : PropTypes.array
}

export default ListTasks
