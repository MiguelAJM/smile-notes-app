import { createContext, useContext, useState } from 'react'

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

  function activeCategoryModal() {
    setModal((prevState) => ({ ...prevState, category: !modal.category }))
  }

  function activeTaskModal() {
    setModal((prevState) => ({ ...prevState, task: !modal.task }))
  }

  return (
    <ModalContext.Provider
      value={{ modal, activeCategoryModal, activeTaskModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}
