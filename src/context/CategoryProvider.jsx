import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  writeBatch
} from 'firebase/firestore'
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
  const { user } = useAuth()

  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState([])

  const [editCategory, setEditCategory] = useState({})

  const [status, setStatus] = useState('idle')

  const navigate = useNavigate()

  const EDIT_CATEGORY = Object.keys(editCategory).length > 0

  // Cargar los datos de la firebase
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

  useEffect(() => {
    if (EDIT_CATEGORY) {
      if (user.uid === editCategory.uid) {
        setCategoryName(editCategory.categoryTitle)
      }
    }
  }, [editCategory])

  function handleChange(e) {
    switch (e.target.name) {
      case 'nameCategory':
        setCategoryName(e.target.value)
        break
      default:
        break
    }
  }

  function handleEdit(item) {
    setEditCategory(item)
  }

  function handleClear() {
    setCategoryName('')
    setEditCategory('')
  }

  // Crear categoria
  async function handleAddCategory() {
    const categoryID = categoryName.split(' ').join('-').toLowerCase()
    try {
      await addDoc(collection(db, 'categories'), {
        categoryTitle: categoryName,
        categoryId: categoryID,
        date_created: Date.now(),
        uid: user.uid
      })
      handleClear()
      toast.success('Categoria creada')
    } catch (error) {
      toast.error('Ha ocurrido un error')
      console.log(error)
    }
  }

  // Editar categorias
  async function hnadleEditCategory(item) {
    const categoryID = categoryName.split(' ').join('-').toLowerCase()
    try {
      const categoryRef = doc(db, 'categories', item.id)
      const tasksQuery = query(collection(db, 'tasks'))
      const tasks = await getDocs(tasksQuery)

      const batch = writeBatch(db)

      batch.update(categoryRef, {
        categoryTitle: categoryName,
        categoryId: categoryID
      })

      tasks.forEach((task) => {
        if (task.data().categoryId === item.categoryId) {
          batch.update(doc(db, 'tasks', task.id), {
            categoryId: categoryID
          })
        }
      })

      navigate(`/task/${categoryID}`)
      batch.commit()
      handleClear()
      toast.success('Categoria editada')
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Eliminar categorias y tareas
  async function handleDeleteCategory(item) {
    handleClear()
    try {
      const categoryRef = doc(db, 'categories', item.id)
      const tasksQuery = query(collection(db, 'tasks'))
      const tasks = await getDocs(tasksQuery)

      const batch = writeBatch(db)

      batch.delete(categoryRef)

      tasks.forEach((task) => {
        if (task.data().categoryId === item.categoryId) {
          batch.delete(doc(db, 'tasks', task.id))
        }
      })

      navigate('/')
      batch.commit()
      toast.success('Categoria eliminada')
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Enviar el formulario
  async function handleCategorySubmit() {
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
        editCategory,
        status,
        EDIT_CATEGORY,
        handleAddCategory,
        handleEdit,
        hnadleEditCategory,
        handleDeleteCategory,
        handleChange,
        handleClear,
        handleCategorySubmit
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
