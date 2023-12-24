import { createContext, useContext, useState } from 'react'
import { useCategory } from './CategoryProvider'

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
    category: false
  })

  const { handleClear } = useCategory()

  const toggleModal = () => {
    setModal((prevState) => ({ ...prevState, category: !modal.category }))
    if (modal.category === true) {
      handleClear('')
    }
  }

  return (
    <ModalContext.Provider value={{ modal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  )
}
