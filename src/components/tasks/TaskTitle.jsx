import { Input } from '@nextui-org/react'
import { useTask } from '../../context/TaskProvider'
import { handleEditTask } from '../../firebase/services/tasks/editTask'
import { isTodayOrYesterday } from '../../utils/helpers/formattedDate'

export default function TaskTitle({ item }) {
  const { editTask, newTaskName, priorityName, handleChange, handleClear } =
    useTask()

  // Opciones para formatear la fecha
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  // Editar el elemento segun el ID
  const editingTask = editTask.id === item.id

  // Enviar el formulario
  const handleSubmitEdit = (e) => {
    e.preventDefault()

    handleClear()
    handleEditTask(item, newTaskName, priorityName, handleClear)
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
        <article>
          <h2 className='text-2xl font-bold'>{item.title}</h2>
          <p className='text-sm mt-1.5 text-white/50'>
            {isTodayOrYesterday(item.date_created, options, { time: 'hours' })}
          </p>
        </article>
      )}
    </>
  )
}
