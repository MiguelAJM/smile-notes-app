import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import handleAddCategory from '../firebase/categories-services/createCategory'

const CategoryContext = createContext()

export function useCategory() {
  const CONTEXT = useContext(CategoryContext)
  if (!CONTEXT) {
    throw new Error('You need to wrap the application in the provider')
  }
  return CONTEXT
}

export default function CategoryProvider({ children }) {
  const { user } = useAuth()

  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState([])

  const [editCategory, setEditCategory] = useState({})
  const [status, setStatus] = useState('idle')

  const navigate = useNavigate()

  // Si hay algo en el estado de editCategory significa el el modo edicion esta activo
  const editingCategory = Object.keys(editCategory).length > 0

  // Cargar las categorias creadas en la firestore
  useEffect(() => {
    try {
      setStatus('pending')
      if (user !== null) {
        const q = query(
          collection(db, 'categories'),
          where('uid', '==', user.uid),
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
      console.log(error.message)
    }
  }, [user])

  // Rellenar los inputs en el modo edicion
  useEffect(() => {
    if (editingCategory) {
      if (user.uid === editCategory.uid) {
        setCategoryName(editCategory.categoryTitle)
      }
    }
  }, [editCategory])

  // Cambiar el estado
  const handleChange = (e) => setCategoryName(e.target.value)

  // Activar el modo edicion
  const handleEdit = (item) => setEditCategory(item)

  // Limpiar el estado
  function handleClear() {
    setCategoryName('')
    setEditCategory('')
  }

  // Enviar el formulario con los datos a la firestore
  async function handleCategorySubmit() {
    if (categoryName === '') {
      return toast.error('Titulo requerido')
    }

    setCategoryName('')
    handleAddCategory(categoryName, user, handleClear, navigate)
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoryName,
        editCategory,
        status,
        handleAddCategory,
        handleEdit,
        handleChange,
        handleClear,
        handleCategorySubmit,
        setCategoryName
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
