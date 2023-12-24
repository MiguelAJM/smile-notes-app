import { collection, doc, getDocs, query, writeBatch } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { toast } from 'sonner'

// Eliminar categorias y tareas
export default async function handleDeleteCategory(item, handleClear, navigate) {
  handleClear()
  try {
    const categoryRef = doc(db, 'categories', item.id)
    const tasksQuery = query(collection(db, 'tasks'))
    const tasks = await getDocs(tasksQuery)

    const batch = writeBatch(db)

    batch.delete(categoryRef)

    tasks.forEach((task) => {
      if (task.data().categoryId === item.categoryId) {
        batch.delete(doc(db, 'tasks', task.id))
      }
    })

    navigate('/')
    batch.commit()
    toast.success('Categoria eliminada')
  } catch (error) {
    toast.error('Ha ocurrido un error')
  }
}
