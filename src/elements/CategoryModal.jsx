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

export default function CategoryModal() {
  const { modal, activeCategoryModal } = useModal()
  const { categoryName, editCategory, handleChange, EDIT_CATEGORY, handleCategorySubmit, hnadleEditCategory } =
    useCategory()

  return (
    <Modal
      className='dark text-foreground bg-background'
      isOpen={modal.category}
      onOpenChange={activeCategoryModal}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form
              onSubmit={
                EDIT_CATEGORY
                  ? (e) => {
                      e.preventDefault()
                      hnadleEditCategory(editCategory)
                    }
                  : (e) => {
                      e.preventDefault()
                      handleCategorySubmit()
                    }
              }
            >
              <ModalHeader className='flex flex-col gap-1'>
                {EDIT_CATEGORY ? 'Editar Categoria' : 'Crear Categoria'}
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
                  {EDIT_CATEGORY ? 'Guardar' : 'Crear'}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
