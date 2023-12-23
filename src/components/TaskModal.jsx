import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { useModal } from '../context/ModalProvider'

export default function TaskModal() {
  const { modal, activeTaskModal } = useModal()

  return (
    <Modal
      className='dark text-foreground bg-background'
      isOpen={modal.task}
      onOpenChange={activeTaskModal}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Crear tarea
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <Button color='primary' onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
