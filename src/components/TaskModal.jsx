import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem
} from '@nextui-org/react'
import { useModal } from '../context/ModalProvider'
import { toast } from 'sonner'
import { handleAddTask } from '../firebase/tasks-services/createTask'
import { useTask } from '../context/TaskProvider'
import { useAuth } from '../context/AuthProvider'
import { useParams } from 'react-router-dom'
import { prioritys } from '../mocks/proprotys'
import { handleEditTask } from '../firebase/tasks-services/editTask'

export default function TaskModal() {
  const { id: category } = useParams()

  const { modal, toggleModalTask } = useModal()
  const { taskName, handleChange, priorityName, handleClear, editTask } =
    useTask()
  const { user } = useAuth()

  // Si hay algo en el estado de editCategory significa el el modo edicion esta activo
  const editingMode = Object.keys(editTask).length > 0

  // Enviar el formulario
  const handleSubmitTask = (e) => {
    e.preventDefault()

    if (taskName === '') {
      return toast.error('Titulo requerido')
    }
    if (priorityName === '') {
      return toast.error('Prioridad requerida')
    }

    if (editTask.id !== undefined) {
      handleEditTask(editTask, taskName, priorityName)
      handleClear()
      return toggleModalTask()
    }

    handleClear()
    toggleModalTask()
    return handleAddTask(category, taskName, user, priorityName)
  }
  return (
    <Modal
      className='dark text-foreground bg-background z-[1000]'
      isOpen={modal.task}
      onOpenChange={toggleModalTask}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmitTask}>
              <ModalHeader className='flex flex-col gap-1'>
                <h2>{editingMode ? 'Editar tarea' : 'Nueva tarea'}</h2>
              </ModalHeader>
              <Divider />
              <ModalBody>
                <div className='grid grid-cols-1 my-2 gap-4'>
                  <Input
                    autoFocus
                    isRequired
                    label='Titulo'
                    type='text'
                    name='taskName'
                    value={taskName}
                    onChange={handleChange}
                  />
                  <Select
                    className='w-full'
                    isRequired
                    size='md'
                    name='priority'
                    label='Prioridad'
                    placeholder='Seleccionar'
                    onChange={handleChange}
                    defaultSelectedKeys={[priorityName]}
                  >
                    {prioritys.slice(1, 5).map((items) => (
                      <SelectItem key={items.value} value={items.value}>
                        {items.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <Divider />
              <ModalFooter className='grid grid-cols-2 gap-4'>
                <Button color='danger' onPress={onClose} className='font-bold'>
                  Cerrar
                </Button>
                <Button type='submit' color='success' className='font-bold'>
                  <h2>{editingMode ? 'Guardar' : 'Crear'}</h2>
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
