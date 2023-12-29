import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import { db } from '../firebase/firebaseConfig'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const CategoryContext = createContext()

export function useCategory() {
  const CONTEXT = useContext(CategoryContext)
  if (!CONTEXT) {
    throw new Error('You need to wrap the application in the provider')
  }
  return CONTEXT
}

export default function CategoryProvider({ children }) {
  const navigate = useNavigate()

  const { user } = useAuth()

  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState([])

  const [editCategory, setEditCategory] = useState({})
  const [status, setStatus] = useState('idle')

  // Si hay algo en el estado de editCategory significa el el modo edicion esta activo
  const editingCategory = Object.keys(editCategory).length > 0

  // Cargar las categorias creadas en la firestore
  useEffect(() => {
    try {
      if (user !== null) {
        setStatus('pending')
        const q = query(
          collection(db, 'categories'),
          where('author_uid', '==', user.uid),
          orderBy('date_created', 'desc')
        )

        const onSub = onSnapshot(q, (querySnapshot) => {
          setCategories(
            querySnapshot.docs.map((item) => {
              return { ...item.data(), id: item.id }
            })
          )
          setStatus('successfull')
        })

        return onSub
      }
    } catch (error) {
      toast.error('Ha ocurrido un error')
      setStatus('rejected')
    }
  }, [user])

  // Rellenar los inputs en el modo edicion
  useEffect(() => {
    if (editingCategory) {
      if (user.uid === editCategory.author_uid) {
        setCategoryName(editCategory.categoryTitle)
      } else {
        navigate('/')
      }
    }
  }, [editCategory])

  // Cambiar el estado
  const handleChange = (e) => setCategoryName(e.target.value)

  // Activar el modo edicion
  const handleEdit = (item) => setEditCategory(item)

  // Limpiar el estado
  const handleClear = () => {
    setCategoryName('')
    setEditCategory('')
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoryName,
        editCategory,
        status,
        handleEdit,
        handleChange,
        handleClear,
        setCategoryName
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
