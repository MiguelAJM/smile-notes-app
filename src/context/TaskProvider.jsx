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
    throw new Error(
      'You need to wrap the application in the provider: TaskProvider'
    )
  }
  return CONTEXT
}

export default function TaskProvider({ children }) {
  const initialState = {
    title: '',
    done: false
  }
  const [tab, setTab] = useState('notes')

  const [task, setTask] = useState(initialState)
  const [updateTask, setUpdateTask] = useState(initialState)

  const [tasks, setTasks] = useState([])
  const [editTask, setEditTask] = useState({})

  const [status, setStatus] = useState('idle')
  const { user } = useAuth()

  // Obtener la lista de tareas de la firebase
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
            querySnapshot.docs.map((item) => {
              return { ...item.data(), id: item.id }
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
        setUpdateTask({
          title: editTask.title,
          done: editTask.done
        })
      }
    }
  }, [editTask])

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value })
  }
  function handleChangeTask(e) {
    setUpdateTask({ ...updateTask, [e.target.name]: e.target.value })
  }
  function handleEditTask(task) {
    setEditTask(task)
  }

  // Añadiendo tarea a la firebase
  async function handleSetTask({ task }) {
    try {
      await addDoc(collection(db, 'tasks'), {
        title: task.title,
        done: task.done,
        date_created: Date.now(),
        uid: user.uid
      })
      toast.success('tarea agregada')
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Actualizar/editar tarea
  async function handleUpdateNote() {
    try {
      if ([updateTask.title].includes('')) {
        toast.error('La tarea requiere un nombre')
      } else {
        const q = doc(db, 'tasks', editTask.id)
        await updateDoc(q, {
          title: updateTask.title,
          done: updateTask.done
        })
        setEditTask({})
        setUpdateTask(initialState)
        toast.success('Cambios guardados')
      }
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Establecer una tarea como terminada
  async function handleCheckTask(task) {
    try {
      const q = doc(db, 'tasks', task.id)
      await updateDoc(q, {
        done: !task.done
      })
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Eliminamos la tarea
  async function handleDeleteNote(id) {
    try {
      const noteRef = doc(db, 'tasks', id)
      await deleteDoc(noteRef)
      toast.success('Tarea eliminada')
    } catch (error) {
      toast.error('Ha ocurrido un error al eliminar la tarea')
    }
  }

  // Enviamos el formulario
  function handleSubmit(e) {
    e.preventDefault()
    if ([task.title].includes('')) {
      toast.error('La tarea requiere un nombre')
    } else {
      handleSetTask({ task })
      setTask(initialState)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tab,
        task,
        tasks,
        updateTask,
        editTask,
        status,
        handleSubmit,
        handleUpdateNote,
        handleDeleteNote,
        handleCheckTask,
        handleChange,
        handleChangeTask,
        handleEditTask,
        setTab
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
