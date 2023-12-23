import { useEffect, useState } from 'react'
import { toast } from 'sonner'
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
import { useAuth } from '../context/AuthProvider'
import CreateTask from '../components/CreateTask'

export default function Tasks() {
  const { user } = useAuth()

  const [categoryName, setCategoryName] = useState('')
  const [editCategory, setEditCategory] = useState({})

  const [updateCategory, setUpdateCategory] = useState('')

  const [categories, setCategory] = useState([])
  const [tasks, setTasks] = useState([])

  const editingCategory = Object.keys(editCategory).length > 0

  useEffect(() => {
    try {
      if (user !== null) {
        const q = query(
          collection(db, 'categories'),
          where('uid', '==', user.uid),
          orderBy('date_created', 'desc')
        )

        const onSub = onSnapshot(q, (querySnapshot) => {
          setCategory(
            querySnapshot.docs.map((item) => {
              return { ...item.data(), id: item.id }
            })
          )
        })
        return onSub
      }
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }, [user])

  useEffect(() => {
    try {
      if (user !== null) {
        const q = query(
          collection(db, 'tasks'),
          where('uid', '==', user.uid),
          orderBy('date_created', 'desc')
        )

        const onSub = onSnapshot(q, (querySnapshot) => {
          setTasks(
            querySnapshot.docs.map((item) => {
              return { ...item.data(), id: item.id }
            })
          )
        })
        return onSub
      }
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }, [user])

  useEffect(() => {
    if (editingCategory) {
      if (user.uid === editCategory.uid) {
        setUpdateCategory(editCategory.categoryTitle)
      }
    }
  }, [editCategory])

  function handleChangeCategory(e) {
    setCategoryName(e.target.value)
  }

  function handleChangeTask(e) {
    setUpdateCategory(e.target.value)
  }

  function handleSubmitCategory(e) {
    e.preventDefault()
    if (categoryName === '') {
      return toast.error('Escribe un nombre')
    }
    handleAddCategory()
    setCategoryName('')
  }

  async function handleAddCategory() {
    try {
      await addDoc(collection(db, 'categories'), {
        categoryTitle: categoryName,
        date_created: Date.now(),
        uid: user.uid
      })
      toast.success('Categoria creada')
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  async function handleEditCategory(categoryId, categoryName) {
    if (updateCategory === '') {
      return toast.error('Escribe un nombre')
    }
    try {
      const categoryRef = doc(db, 'categories', categoryId)
      const tasksQuery = query(collection(db, 'tasks'))
      const tasks = await getDocs(tasksQuery)

      const batch = writeBatch(db)

      batch.update(categoryRef, {
        categoryTitle: updateCategory
      })

      tasks.forEach((task) => {
        if (task.data().category === categoryName) {
          batch.update(doc(db, 'tasks', task.id), {
            category: updateCategory
          })
        }
      })

      await batch.commit()
      toast.success('Cambios guardados')
      setUpdateCategory('')
      setEditCategory({})
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Obtener tareas por categorias
  const NEW_TASKS = categories.reduce((acc, tasksItem) => {
    const CURRENT_TASK = tasks.filter(
      (item) => item.category === tasksItem.categoryTitle
    )

    if (CURRENT_TASK) {
      acc.push({
        ...tasksItem,
        tasks: CURRENT_TASK
      })
    }

    return acc
  }, [])

  return (
    <div>
      <h2>Smile notes</h2>
      <form className='mb-8' onSubmit={handleSubmitCategory}>
        <h2>Crear categoria</h2>
        <input
          type='text'
          value={categoryName}
          onChange={handleChangeCategory}
        />
        <button>Crear</button>
      </form>

      <div className='grid grid-cols-6 gap-5 w-screen'>
        {NEW_TASKS.map((item) => {
          const editItem = editCategory.id === item.id
          return (
            <div className='col-span-2' key={item.id}>
              {editItem ? (
                <input
                  value={updateCategory}
                  onChange={handleChangeTask}
                  type='text'
                />
              ) : (
                <h2>Categoria: {item.categoryTitle}</h2>
              )}
              {item.tasks.map((task) => {
                return (
                  <div className='my-4' key={task.id}>
                    <h2>Tarea: {task.title}</h2>
                    <h2>ID: {task.id}</h2>
                    <h2>Categoria: {task.category}</h2>
                    <h2>Completo: {task.completed ? 'Completado' : 'No completado'}</h2>
                    <button>Eliminar</button>
                  </div>
                )
              })}
              <button
                onClick={() =>
                  handleDeleteCategory(item.id, item.categoryTitle)
                }
              >
                Eliminar
              </button>
              <button
                onClick={
                  editItem
                    ? () => handleEditCategory(item.id, item.categoryTitle)
                    : () =>
                        setEditCategory({
                          categoryTitle: item.categoryTitle,
                          id: item.id,
                          uid: item.uid,
                          date_created: item.date_created
                        })
                }
              >
                {editItem ? 'Guardar' : 'Editar'}
              </button>
              <CreateTask item={item} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
