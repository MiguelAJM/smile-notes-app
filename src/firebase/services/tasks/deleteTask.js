import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'sonner'
import { db } from '../../firebaseConfig'

// Eliminar tarea
export const handleDeleteTask = async (item, handleClear) => {
  try {
    const taskRef = doc(db, 'tasks', item.id)
    await deleteDoc(taskRef)
    handleClear()
    toast.success('Tarea eliminada')
  } catch (error) {
    toast.error('Ha ocurrido un error')
  }
}
