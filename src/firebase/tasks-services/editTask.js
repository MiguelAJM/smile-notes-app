import { doc, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { db } from '../firebaseConfig'

// Editar tarea
export const handleSaveTask = async (
  item,
  newTaskName,
  priorityName,
  handleClear
) => {
  if (newTaskName === '') {
    return toast.error('Titulo requerido')
  }

  if (priorityName === '') {
    return toast.error('Prioridad requerida')
  }
  try {
    const q = doc(db, 'tasks', item.id)
    await updateDoc(q, {
      title: newTaskName,
      priority: priorityName
    })
    handleClear()
    toast.success('Cambios guardados')
  } catch (error) {
    toast.error('Ha ocurrido un error')
  }
}
