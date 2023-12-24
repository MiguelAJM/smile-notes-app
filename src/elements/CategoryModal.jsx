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
import { bgPrimary } from '../themes'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthProvider'
import handleAddCategory from '../firebase/categories-services/createCategory'
import handleEditCategory from '../firebase/categories-services/editCategory'

export default function CategoryModal() {
  const { user } = useAuth()
  const { modal, activeCategoryModal } = useModal()
  const {
    categoryName,
    editCategory,
    handleChange,
    handleClear,
    setCategoryName
  } = useCategory()

  const navigate = useNavigate()

  // Si hay algo en el estado de editCategory significa el el modo edicion esta activo
  const editingMode = Object.keys(editCategory).length > 0

  // Enviar el formulario con los datos a la firestore
  async function handleCategorySubmit(e) {
    e.preventDefault()
    if (categoryName === '') {
      return toast.error('Titulo requerido')
    }

    setCategoryName('')
    handleAddCategory(categoryName, user, handleClear, navigate)
  }

  // Si el modo edicion esta activo podemos actualizar, en caso contrario se crea una nueva
  const editingCategory = editingMode
    ? () => {
        handleEditCategory(editCategory, categoryName, handleClear, navigate)
      }
    : () => handleCategorySubmit()

  return (
    <Modal
      className='dark text-foreground bg-background'
      isOpen={modal.category}
      onOpenChange={activeCategoryModal}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={editingCategory}>
              <ModalHeader className='flex flex-col gap-1'>
                {editingMode ? 'Editar Categoria' : 'Crear Categoria'}
              </ModalHeader>
              <Divider />
              <ModalBody>
                <Input
                  className='my-5'
                  label='Titulo'
                  type='text'
                  name='nameCategory'
                  autoFocus
                  value={categoryName}
                  onChange={handleChange}
                />
              </ModalBody>
              <Divider />
              <ModalFooter className='grid grid-cols-2 gap-4'>
                <Button color='danger' onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  type='submit'
                  className={`${bgPrimary}`}
                  onPress={onClose}
                >
                  {editingMode ? 'Guardar' : 'Crear'}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
