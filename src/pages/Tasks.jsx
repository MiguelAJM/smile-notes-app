import { Input } from '@nextui-org/react'
import { useParams } from 'react-router-dom'
import { useTask } from '../context/TaskProvider'
import HeaderTask from '../elements/HeaderTask'
import Layaout from '../components/Layaout'
import ListTasks from '../components/ListTasks'

export default function Tasks() {
  const { taskName, handleChange, handleSubmitTask } = useTask()

  // Obtener la categoria por la URL
  const { id } = useParams()
  const CATEGORY = id

  // Enviar en informulario
  const handleSubmit = (e) => {
    e.preventDefault()
    handleSubmitTask(CATEGORY)
  }

  return (
    <Layaout>
      <div className='w-full h-full flex flex-col gap-4 overflow-y-auto mb-20'>
        <HeaderTask />

        <ListTasks />
      </div>

      <form
        className='absolute bottom-0 left-0 right-0 p-4'
        onSubmit={handleSubmit}
      >
        <Input
          name='taskName'
          type='text'
          size='lg'
          autoFocus
          label='Nueva tarea...'
          value={taskName}
          onChange={handleChange}
          className='px-32'
        />
      </form>
    </Layaout>
  )
}
