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
import { toast } from 'sonner'

const NoteContext = createContext()

export function useNote() {
  const CONTEXT = useContext(NoteContext)
  if (!CONTEXT) {
    throw new Error(
      'You need to wrap the application in the provider: NoteProvider'
    )
  }
  return CONTEXT
}

export default function NoteProvider({ children }) {
  const initialState = {
    title: '',
    description: ''
  }

  const [note, setNote] = useState(initialState)
  const [updateNote, setUpdateNote] = useState(initialState)

  const [notes, setNotes] = useState([])
  const [editNote, setEditNote] = useState({})

  const [status, setStatus] = useState('idle')
  const { user } = useAuth()

  // Obtenemos la lista de notas de la firestore
  useEffect(() => {
    try {
      if (user !== null) {
        setStatus('pending')
        const q = query(
          collection(db, 'notes'),
          where('uid', '==', user.uid),
          orderBy('date_created', 'desc')
        )
        const unsub = onSnapshot(q, (querySnapshot) => {
          setNotes(
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
    if (Object.keys(editNote).length > 0) {
      if (user.uid === editNote.uid) {
        setUpdateNote({
          title: editNote.title,
          description: editNote.description
        })
      }
    }
  }, [editNote])

  function handleChange(e) {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  function handleChangeNotes(e) {
    setUpdateNote({ ...updateNote, [e.target.name]: e.target.value })
  }
  function handleEditNote(note) {
    setEditNote(note)
  }

  // Añadiendo nota firebase
  async function handleSetNote({ note }) {
    try {
      await addDoc(collection(db, 'notes'), {
        title: note.title,
        description: note.description,
        date_created: Date.now(),
        uid: user.uid
      })
      toast.success('Nota agregada')
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Actualizar/editar nota
  async function handleUpdateNote() {
    try {
      if ([updateNote.title, updateNote.description].includes('')) {
        toast.error('Todos los campos son requeridos')
      } else {
        const q = doc(db, 'notes', editNote.id)
        await updateDoc(q, {
          title: updateNote.title,
          description: updateNote.description
        })
        setEditNote({})
        setUpdateNote(initialState)
        toast.success('Cambios guardados')
      }
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  // Eliminamos la nota
  async function handleDeleteNote(id) {
    try {
      const noteRef = doc(db, 'notes', id)
      await deleteDoc(noteRef)
      toast.success('Nota eliminada')
    } catch (error) {
      toast.error('Ha ocurrido un error al eliminar la nota')
    }
  }

  // Enviamos el formulario
  function handleSubmit() {
    if ([note.title, note.description].includes('')) {
      toast.error('Todos los campos son requeridos')
    } else {
      handleSetNote({ note })
      setNote(initialState)
    }
  }

  return (
    <NoteContext.Provider
      value={{
        note,
        updateNote,
        notes,
        editNote,
        status,
        handleUpdateNote,
        handleChange,
        handleChangeNotes,
        handleSetNote,
        handleDeleteNote,
        handleSubmit,
        handleEditNote
      }}
    >
      {children}
    </NoteContext.Provider>
  )
}
