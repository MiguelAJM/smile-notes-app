import { Button, Tooltip } from '@nextui-org/react'
import { handleDeleteTask } from '../../firebase/services/tasks/deleteTask'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useModal } from '../../context/ModalProvider'
import { useTask } from '../../context/TaskProvider'

export default function TaskButtons({ item }) {
  const { handleEdit, handleClear } = useTask()
  const { toggleModalTask } = useModal()

  const handleEditTask = (item) => {
    toggleModalTask()
    handleEdit(item)
  }

  return (
    <div className='relative flex flex-col gap-4'>
      <Tooltip showArrow={true} content='Editar tarea'>
        <Button
          onPress={() => handleEditTask(item)}
          isIconOnly
          radius='full'
          color='success'
        >
          <IconEdit />
        </Button>
      </Tooltip>
      <Tooltip showArrow={true} content='Delizar para eliminar'>
        <Button
          onPress={() => handleDeleteTask(item, handleClear)}
          isIconOnly
          radius='full'
          color='danger'
        >
          <IconTrash />
        </Button>
      </Tooltip>
    </div>
  )
}
