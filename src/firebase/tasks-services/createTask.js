import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { toast } from 'sonner'

// Crear tarea
export const handleAddTask = async (
  categoryName,
  taskName,
  user,
  priorityName
) => {
  try {
    await addDoc(collection(db, 'tasks'), {
      title: taskName,
      categoryId: categoryName,
      priority: priorityName,
      completed: false,
      date_created: Date.now(),
      author_uid: user.uid
    })
    toast.success('Tarea agregada')
  } catch (error) {
    toast.error('Ha ocurrido un error')
    console.log(error.message)
  }
}
