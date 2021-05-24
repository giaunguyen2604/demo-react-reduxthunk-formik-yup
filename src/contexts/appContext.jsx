import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

const AppContext = React.createContext(null)

const AppProvider = ({ children }) => {

  const [isEditMode, setIsEditMode] = useState(false)
  const [initTask, setInitTask] = useState({id:'', value: ''})
  const [idItemDelete, setIdItemDelete] = useState('')

  const updateIsEditMode = (boolean) => {
    setIsEditMode(boolean)
  }

  const updateInitTask= (value) => {
    setInitTask(value)
  }

  const updateIdItemDelete = (id) => {
    setIdItemDelete(id)
  }

  const providerValues = {
    isEditMode,
    updateIsEditMode,
    initTask,
    updateInitTask,
    idItemDelete,
    updateIdItemDelete
  }

  return (
    <AppContext.Provider value={providerValues}>
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node
}

const useAppContext = () => {
  const state = useContext(AppContext)
  if (!state) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return state
}

export { AppProvider, useAppContext }


