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

  // Si hay algo en el estado de editCategory significa el el modo edicion esta activo
  const editingTask = Object.keys(editTask).length > 0

  // Cargar las tareas creadas en la firestore
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
    if (editingTask) {
      if (user.uid === editTask.uid) {
        setNewTaskName(editTask.title)
      }
    }
  }, [editTask])

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

  // Activar el modo edicion
  const handleEdit = (item) => setEditTask(item)

  // Limpiar el estado
  function handleClear() {
    setNewTaskName('')
    setEditTask({})
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskName,
        newTaskName,
        editTask,
        editingTask,
        status,
        handleChange,
        handleEdit,
        setTaskName,
        handleClear
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
