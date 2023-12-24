import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { toast } from 'sonner'

// Eliminar tarea
export default async function handleDeleteTask(item, handleClear) {
  try {
    handleClear()
    const taskRef = doc(db, 'tasks', item.id)
    await deleteDoc(taskRef)
    toast.success('Tarea eliminada')
  } catch (error) {
    toast.error('Ha ocurrido un error')
  }
}
