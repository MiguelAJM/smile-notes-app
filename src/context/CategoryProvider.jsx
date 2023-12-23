import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { toast } from 'sonner'

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
  const [status, setStatus] = useState('idle')

  // Cargar los datos de la firebase
  useEffect(() => {
    try {
      setStatus('pending')
      if (user.uid !== null) {
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
    }
  }, [user])

  function handleCategoryChange(e) {
    setCategoryName(e.target.value)
  }

  // Crear categoria
  async function handleAddCategory() {
    try {
      await addDoc(collection(db, 'categories'), {
        categoryTitle: categoryName,
        categoryId: categoryName.split(' ').join('-').toLowerCase(),
        date_created: Date.now(),
        uid: user.uid
      })
      toast.success('Categoria creada')
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Enviar el formulario
  async function handleCategorySubmit(e) {
    e.preventDefault()
    setCategoryName('')
    if (categoryName === '') {
      return toast.error('Titulo requerido')
    }
    handleAddCategory()
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoryName,
        status,
        handleAddCategory,
        handleCategoryChange,
        handleCategorySubmit
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
