import { toast } from 'sonner'
import { db } from '../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'

// Crear categoria
export default async function handleAddCategory(
  categoryName,
  user,
  categoryPath
) {
  try {
    await addDoc(collection(db, 'categories'), {
      categoryTitle: categoryName,
      categoryId: categoryPath,
      date_created: Date.now(),
      author_uid: user.uid
    })
    toast.success('Categoria creada')
  } catch (error) {
    toast.error('Ha ocurrido un error')
  }
}
