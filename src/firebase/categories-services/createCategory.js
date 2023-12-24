import { toast } from 'sonner'
import { db } from '../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'

// Crear categoria
export default async function handleAddCategory(categoryName, user, handleClear, navigate) {
  const categoryID = categoryName.split(' ').join('-').toLowerCase()
  try {
    await addDoc(collection(db, 'categories'), {
      categoryTitle: categoryName,
      categoryId: categoryID,
      date_created: Date.now(),
      uid: user.uid
    })
    handleClear()
    navigate(`/task/${categoryID}`)
    toast.success('Categoria creada')
  } catch (error) {
    toast.error('Ha ocurrido un error')
    console.log(error)
  }
}
