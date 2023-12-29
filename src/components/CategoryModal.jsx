import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { useModal } from '../context/ModalProvider'
import { useCategory } from '../context/CategoryProvider'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthProvider'
import handleAddCategory from '../firebase/categories-services/createCategory'
import handleEditCategory from '../firebase/categories-services/editCategory'
import { isCategoryExists } from '../helpers/isCategoryExists'

export default function CategoryModal() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const { modal, toggleModalCategory } = useModal()
  const {
    categories,
    categoryName,
    editCategory,
    editingCategory,
    handleChange,
    handleClear
  } = useCategory()

  const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]+/g
  const categoryTitle = categoryName.replace(regex, '-')

  // Crear categoria/editar categoria
  const handleSubmit = async (e) => {
    e.preventDefault()
    const currentCategory = isCategoryExists(categories, categoryTitle)
    const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/g
    const categoryPath = categoryName.replace(regex, '-').toLowerCase()

    if (currentCategory) {
      return toast.error('Esta categoria ya existe')
    }
    // El titulo es requerido
    if (categoryName === '') {
      return toast.error('Titulo requerido')
    }
    // Si hay una categoria la editamos
    if (editCategory.id !== undefined) {
      navigate(`/task/${categoryPath}/u/${user.uid}`)
      handleEditCategory(editCategory, user, categoryName, categoryPath)
      handleClear()
      return toggleModalCategory()
    }

    navigate(`/task/${categoryPath}/u/${user.uid}`)
    handleAddCategory(categoryName, user, categoryPath)
    handleClear()
    return toggleModalCategory()
  }

  return (
    <Modal
      className='dark text-foreground bg-background z-[1000]'
      isOpen={modal.category}
      onOpenChange={toggleModalCategory}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit}>
              <ModalHeader className='flex flex-col gap-1'>
                <h2>
                  {editingCategory ? 'Editar Categoria' : 'Crear Categoria'}
                </h2>
              </ModalHeader>
              <Divider />
              <ModalBody>
                <Input
                  className='my-5'
                  label='Titulo'
                  type='text'
                  name='nameCategory'
                  autoFocus
                  value={categoryTitle}
                  onChange={handleChange}
                />
              </ModalBody>
              <Divider />
              <ModalFooter className='grid grid-cols-2 gap-4'>
                <Button color='danger' onPress={onClose} className='font-bold'>
                  Cerrar
                </Button>
                <Button type='submit' color='success' className='font-bold'>
                  {editingCategory ? 'Guardar' : 'Crear'}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
