import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { toast } from 'sonner'

// Crear tarea
export default async function handleAddTask(categoryName, taskName, user) {
  try {
    await addDoc(collection(db, 'tasks'), {
      title: taskName,
      categoryId: categoryName,
      completed: false,
      date_created: Date.now(),
      uid: user.uid
    })
    toast.success('Tarea agregada')
  } catch (error) {
    toast.error('Ha ocurrido un error')
  }
}
