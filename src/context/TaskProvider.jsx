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
import { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig'
import { useAuth } from './AuthProvider'

const TaskContext = createContext()

export function useTask() {
  const CONTEXT = useContext(TaskContext)
  if (!CONTEXT) {
    throw new Error(
      'You need to wrap the application in the provider: TaskProvider'
    )
  }
  return CONTEXT
}

export default function TaskProvider({ children }) {
  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const [tasks, setTasks] = useState([])
  const [editTask, setEditTask] = useState({})
  const [status, setStatus] = useState('idle')

  const { user } = useAuth()
  const displayName = user?.displayName

  // Obtenemos la lista de tareas de la firestore
  useEffect(() => {
    try {
      if (user !== null) {
        setStatus('pending')
        const q = query(
          collection(db, 'tasks'),
          where('uid', '==', user.uid),
          orderBy('date_created', 'desc')
        )
        const unsub = onSnapshot(q, (querySnapshot) => {
          setTasks(
            querySnapshot.docs.map((tasks) => {
              return { ...tasks.data(), id: tasks.id }
            })
          )
          setStatus('succesfull')
        })
        return unsub
      }
    } catch (error) {
      setStatus('rejected')
    }
  }, [user])

  // Llenamos los inputs en caso de estar en el modo edicion
  useEffect(() => {
    if (Object.keys(editTask).length > 0) {
      if (user.uid === editTask.uid) {
        setTask({
          title: editTask.title,
          description: editTask.description
        })
      }
    }
  }, [editTask])

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  // Añadiendo tarea y/o actualizandola en firebase
  async function handleSetTask({ task }) {
    try {
      if (editTask.id) {
        const q = doc(db, 'tasks', editTask.id)
        await updateDoc(q, {
          title: task.title,
          description: task.description
        })
        setEditTask({})
        setTask({
          title: '',
          description: ''
        })
      } else {
        await addDoc(collection(db, 'tasks'), {
          title: task.title,
          description: task.description,
          date_created: Date.now(),
          uid: user.uid
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Eliminamos la tarea
  async function deleteTask(id) {
    try {
      const taskRef = doc(db, 'tasks', id)
      await deleteDoc(taskRef)
    } catch (error) {
      console.log(error)
    }
  }

  // Enviamos el formulario
  function handleSubmit(e) {
    e.preventDefault()
    if ([task.title, task.title].includes('')) {
      console.log('Todos los cambos son requeridos')
    } else {
      handleSetTask({ task })
      setTask({
        title: '',
        description: ''
      })
    }
  }

  return (
    <TaskContext.Provider
      value={{
        task,
        tasks,
        editTask,
        displayName,
        status,
        handleChange,
        handleSetTask,
        deleteTask,
        handleSubmit,
        setEditTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
