import { Input } from '@nextui-org/react'
import { useTask } from '../context/TaskProvider'
import { toast } from 'sonner'
import handleSaveTask from '../firebase/tasks-services/editTask'
import TaskTitle from './TaskTitle'

export default function EditTaskInput({ item }) {
  const { editTask, newTaskName, handleChange, handleClear } = useTask()

  // Editar el elemento segun el ID
  const editingTask = editTask.id === item.id

  // Enviar el formulario
  async function handleSubmitEdit(e) {
    e.preventDefault()
    if (newTaskName === '') {
      return toast.error('Titulo requerido')
    }
    handleClear()
    handleSaveTask(item, newTaskName, handleClear)
  }

  return (
    <>
      {editingTask ? (
        <form className='w-full my-0.5' onSubmit={handleSubmitEdit}>
          <Input
            autoFocus
            name='editTask'
            placeholder={item.title}
            value={newTaskName}
            onChange={handleChange}
            size='sm'
          />
        </form>
      ) : (
        <TaskTitle item={item} />
      )}
    </>
  )
}
