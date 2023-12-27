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
  const [priorityName, setPriorityName] = useState('none')

  const [selectedPriority, setSelectedPriority] = useState('all')

  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState(false)

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
        setPriorityName(editTask.priority)
      }
    }
  }, [editTask])

  //

  // Cambiar el estado
  const handleChange = (e) => {
    if (e.target.name === 'taskName') {
      return setTaskName(e.target.value)
    }

    if (e.target.name === 'editTask') {
      return setNewTaskName(e.target.value)
    }

    if (e.target.name === 'priority') {
      return setPriorityName(e.target.value)
    }
  }

  // Filtrar por prioridad
  const handleSelectPriority = (e) => {
    setSelectedPriority(e.target.value)
  }

  // Alternar las tareas terminadas
  const toggleCompleted = () => {
    setCompletedTasks(!completedTasks)
  }

  // Activar el modo edicion
  const handleEdit = (item) => setEditTask(item)

  // Limpiar el estado
  const handleClear = () => {
    setTaskName('')
    setNewTaskName('')
    setPriorityName('none')
    setEditTask({})
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskName,
        priorityName,
        newTaskName,
        selectedPriority,
        editTask,
        completedTasks,
        status,
        handleChange,
        handleSelectPriority,
        handleEdit,
        setTaskName,
        toggleCompleted,
        handleClear
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
