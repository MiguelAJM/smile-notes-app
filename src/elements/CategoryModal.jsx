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

export default function CategoryModal() {
  const { modal, activeCategoryModal } = useModal()
  const {
    categoryName,
    handleCategoryChange,
    handleCategorySubmit
  } = useCategory()

  return (
    <Modal
      className='dark text-foreground bg-background'
      isOpen={modal.category}
      onOpenChange={activeCategoryModal}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleCategorySubmit}>
              <ModalHeader className='flex flex-col gap-1'>
                Crear Categoria
              </ModalHeader>
              <Divider />
              <ModalBody>
                <Input
                  className='my-5'
                  label='Titulo'
                  type='text'
                  autoFocus
                  value={categoryName}
                  onChange={handleCategoryChange}
                />
              </ModalBody>
              <Divider />
              <ModalFooter className='grid grid-cols-2 gap-4'>
                <Button color='danger' onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  type='submit'
                  className='bg-purple-600'
                  onPress={onClose}
                >
                  Crear
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
