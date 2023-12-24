import { doc, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { db } from '../firebaseConfig'

// Editar tarea
export const handleSaveTask = async (item, newTaskName, handleClear) => {
  try {
    const q = doc(db, 'tasks', item.id)
    await updateDoc(q, {
      title: newTaskName
    })
    handleClear()
    toast.success('Cambios guardados')
  } catch (error) {
    toast.error('Ha ocurrido un error')
  }
}
