import { Input } from '@nextui-org/react'
import { useTask } from '../context/TaskProvider'
import { handleSaveTask } from '../firebase/tasks-services/editTask'
import { isTodayOrYesterday } from '../helpers/formattedDate'

export default function TaskTitle({ item }) {
  const { editTask, newTaskName, priorityName, handleChange, handleClear } =
    useTask()

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
    handleSaveTask(item, newTaskName, priorityName, handleClear)
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
            {isTodayOrYesterday(item.date_created, options, true)}
          </p>
        </article>
      )}
    </>
  )
}
