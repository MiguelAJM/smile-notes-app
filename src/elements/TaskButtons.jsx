import { Button } from '@nextui-org/react'
import { useTask } from '../context/TaskProvider'
import {
  IconEdit,
  IconSquareCheckFilled,
  IconTrash,
  IconX
} from '@tabler/icons-react'

export default function TaskButtons({ item }) {
  const {
    editTask,
    handleSaveTask,
    handleDeleteTask,
    handleEdit,
    handleCancelEdit
  } = useTask()

  // Editar el elemento segun el ID
  const EDIT_TASK_ID = editTask.id === item.id

  return (
    <>
      <Button
        radius='full'
        color='success'
        isIconOnly
        onPress={
          EDIT_TASK_ID ? () => handleSaveTask(item) : () => handleEdit(item)
        }
      >
        {EDIT_TASK_ID ? <IconSquareCheckFilled /> : <IconEdit />}
      </Button>
      <Button
        onPress={
          EDIT_TASK_ID ? () => handleCancelEdit() : () => handleDeleteTask(item)
        }
        radius='full'
        color='danger'
        isIconOnly
      >
        {EDIT_TASK_ID ? <IconX /> : <IconTrash />}
      </Button>
    </>
  )
}
