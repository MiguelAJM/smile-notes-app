import { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthProvider'

const CategoriesContext = createContext()

export function useCategories() {
  const CONTEXT = useContext(CategoriesContext)
  if (!CONTEXT) {
    throw new Error(
      'You need to wrap the application in the provider: CategoriesProvider'
    )
  }
  return CONTEXT
}

export default function CategoriesProvider({ children }) {
  const [categorie, setCategorie] = useState('')

  const [categories, setCategories] = useState([])
  const [editCategories, setEditCategories] = useState({})

  const { user } = useAuth()

  return (
    <CategoriesContext.Provider
      value={{ categorie, categories, editCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}
