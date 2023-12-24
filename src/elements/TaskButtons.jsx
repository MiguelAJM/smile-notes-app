import { Button } from '@nextui-org/react'
import { useTask } from '../context/TaskProvider'
import {
  IconEdit,
  IconSquareCheckFilled,
  IconTrash,
  IconX
} from '@tabler/icons-react'
import handleSaveTask from '../firebase/tasks-services/editTask'
import handleDeleteTask from '../firebase/tasks-services/deleteTask'

export default function TaskButtons({ item }) {
  const { editTask, newTaskName, handleEdit, handleClear } =
    useTask()

  // Editar el elemento segun el ID
  const editTaskById = editTask.id === item.id

  const editingTask = editTaskById
    ? () => handleSaveTask(item, newTaskName, handleClear)
    : () => handleEdit(item)

  const deletingTask = editTaskById
    ? () => handleClear()
    : () => handleDeleteTask(item, handleClear)

  return (
    <>
      <Button
        radius='full'
        color='success'
        isIconOnly
        onPress={editingTask}
      >
        {editTaskById ? <IconSquareCheckFilled /> : <IconEdit />}
      </Button>
      <Button
        onPress={deletingTask}
        radius='full'
        color='danger'
        isIconOnly
      >
        {editTaskById ? <IconX /> : <IconTrash />}
      </Button>
    </>
  )
}
