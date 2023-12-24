import { collection, doc, getDocs, query, writeBatch } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { toast } from 'sonner'

// Editar categorias
export default async function handleEditCategory(
  e,
  item,
  categoryName,
  handleClear,
  navigate
) {
  e.preventDefault()
  handleClear()
  if (categoryName === '') {
    return toast.error('Titulo requerido')
  }
  const categoryID = categoryName.split(' ').join('-').toLowerCase()
  try {
    const categoryRef = doc(db, 'categories', item.id)
    const tasksQuery = query(collection(db, 'tasks'))

    const tasks = await getDocs(tasksQuery)

    const batch = writeBatch(db)

    batch.update(categoryRef, {
      categoryTitle: categoryName,
      categoryId: categoryID
    })

    tasks.forEach((task) => {
      if (task.data().categoryId === item.categoryId) {
        batch.update(doc(db, 'tasks', task.id), {
          categoryId: categoryID
        })
      }
    })

    navigate(`/task/${categoryID}`)
    batch.commit()
    toast.success('Categoria editada')
  } catch (error) {
    toast.error('Ha ocurrido un error')
  }
}
