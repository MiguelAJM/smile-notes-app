import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { toast } from 'sonner'

const TaskContext = createContext()

export function useTask() {
  const CONTEXT = useContext(TaskContext)
  if (!CONTEXT) {
    throw new Error('You need to wrap the application in the provider')
  }
  return CONTEXT
}

export default function TaskProvider({ children }) {
  const { user } = useAuth()

  const [taskName, setTaskName] = useState('')
  const [tasks, setTasks] = useState([])

  const [newTaskName, setNewTaskName] = useState('')
  const [editTask, setEditTask] = useState({})
  const [status, setStatus] = useState('')

  const EDIT_MODE = Object.keys(editTask).length > 0

  // Cargar los datos de la firebase
  useEffect(() => {
    try {
      if (user !== null) {
        setStatus('pending')
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
    if (EDIT_MODE) {
      if (user.uid === editTask.uid) {
        setNewTaskName(editTask.title)
      }
    }
  }, [editTask])

  // <----------------------------->
  // FUNCIONES VARIAS
  // <----------------------------->

  // Cambiar el estado
  function handleChange(e) {
    switch (e.target.name) {
      case 'taskName':
        setTaskName(e.target.value)
        break
      case 'editTask':
        setNewTaskName(e.target.value)
        break
      default:
        break
    }
  }

  // Salir del modo de edicion
  function handleCancelEdit() {
    setNewTaskName('')
    setEditTask({})
  }

  // Activar el modo edicion
  function handleEdit(item) {
    setEditTask(item)
  }

  // Limpiar el estado
  function clearState() {
    setNewTaskName('')
    setEditTask({})
  }

  // <----------------------------->
  // CRUD DE TAREAS
  // <----------------------------->

  // Crear tarea
  async function handleAddTask(categoryName) {
    try {
      await addDoc(collection(db, 'tasks'), {
        title: taskName,
        categoryId: categoryName,
        completed: false,
        date_created: Date.now(),
        uid: user.uid
      })
      toast.success('Tarea agregada')
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Editar tarea
  async function handleSaveTask(item) {
    if (newTaskName === '') {
      return toast.error('Titulo requerido')
    }
    try {
      clearState()
      const q = doc(db, 'tasks', item.id)
      await updateDoc(q, {
        title: newTaskName
      })
      toast.success('Cambios guardados')
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Eliminar tarea
  async function handleDeleteTask(item) {
    try {
      clearState()
      const taskRef = doc(db, 'tasks', item.id)
      await deleteDoc(taskRef)
      toast.success('Tarea eliminada')
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Establecer tarea completada
  async function handleCheckTask(item) {
    try {
      const q = doc(db, 'tasks', item.id)
      await updateDoc(q, {
        completed: !item.completed
      })
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Enviar el formulario
  async function handleSubmitTask(categoryName) {
    if (taskName === '') {
      return toast.error('Titulo requerido')
    }
    handleAddTask(categoryName)
    setTaskName('')
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskName,
        newTaskName,
        editTask,
        EDIT_MODE,
        status,
        handleCheckTask,
        handleChange,
        handleAddTask,
        handleSaveTask,
        handleDeleteTask,
        handleSubmitTask,
        handleEdit,
        handleCancelEdit
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
