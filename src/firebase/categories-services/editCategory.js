import { collection, doc, getDocs, query, writeBatch } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { toast } from 'sonner'

// Editar categorias
export default async function handleEditCategory(
  item,
  user,
  categoryName,
  categoryPath
) {
  try {
    const categoryRef = doc(db, 'categories', item.id)
    const tasksQuery = query(collection(db, 'tasks'))
    const tasks = await getDocs(tasksQuery)

    const batch = writeBatch(db)
    batch.update(categoryRef, {
      categoryTitle: categoryName,
      categoryId: categoryPath
    })

    tasks.forEach((task) => {
      if (task.data().categoryId === item.categoryId) {
        if (task.data().author_uid === user.uid) {
          batch.update(doc(db, 'tasks', task.id), {
            categoryId: categoryPath
          })
        }
      }
    })

    batch.commit()
    toast.success('Cambios guardados')
  } catch (error) {
    toast.error('Ha ocurrido un error')
  }
}
