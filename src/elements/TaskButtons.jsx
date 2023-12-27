import {
  IconEdit,
  IconSquareCheckFilled,
  IconTrash,
  IconX
} from '@tabler/icons-react'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { useTask } from '../context/TaskProvider'
import { handleSaveTask } from '../firebase/tasks-services/editTask'
import { handleDeleteTask } from '../firebase/tasks-services/deleteTask'
import { prioritys } from '../mocks/proprotys'

export default function TaskButtons({ item }) {
  const {
    editTask,
    newTaskName,
    handleEdit,
    handleChange,
    priorityName,
    handleClear
  } = useTask()

  // Editar el elemento segun el ID
  const editTaskById = editTask.id === item.id

  const editingTask = editTaskById
    ? () => handleSaveTask(item, newTaskName, priorityName, handleClear)
    : () => handleEdit(item)

  const deletingTask = editTaskById
    ? () => handleClear()
    : () => handleDeleteTask(item, handleClear)

  return (
    <>
      {editTaskById && (
        <Select
          className='w-32'
          size='sm'
          label='Prioridad'
          name='priority'
          defaultSelectedKeys={[item.priority]}
          onChange={handleChange}
          placeholder='Seleccionar'
        >
          {prioritys.slice(1, 5).map((items) => (
            <SelectItem key={items.value} value={items.value}>
              {items.label}
            </SelectItem>
          ))}
        </Select>
      )}
      <Button isIconOnly radius='full' color='success' onPress={editingTask}>
        {editTaskById ? <IconSquareCheckFilled /> : <IconEdit />}
      </Button>
      <Button isIconOnly radius='full' color='danger' onPress={deletingTask}>
        {editTaskById ? <IconX /> : <IconTrash />}
      </Button>
    </>
  )
}
