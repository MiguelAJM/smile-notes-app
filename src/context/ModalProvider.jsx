import { createContext, useContext, useState } from 'react'
import { useCategory } from './CategoryProvider'
import { useTask } from './TaskProvider'

const ModalContext = createContext()

export function useModal() {
  const CONTEXT = useContext(ModalContext)
  if (!CONTEXT) {
    throw new Error('You need to wrap the application in the provider')
  }
  return CONTEXT
}

export default function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    category: false,
    task: false
  })

  const { handleClear: clearCategory } = useCategory()
  const { handleClear: clearTask } = useTask()

  const toggleModalCategory = () => {
    setModal((prevState) => ({ ...prevState, category: !modal.category }))
    if (modal.category === true) {
      clearCategory()
    }
  }

  const toggleModalTask = () => {
    setModal((prevState) => ({ ...prevState, task: !modal.task }))
    if (modal.task === true) {
      clearTask()
    }
  }

  return (
    <ModalContext.Provider
      value={{ modal, toggleModalCategory, toggleModalTask }}
    >
      {children}
    </ModalContext.Provider>
  )
}
