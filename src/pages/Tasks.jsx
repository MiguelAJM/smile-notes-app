import { Input } from '@nextui-org/react'
import { useParams } from 'react-router-dom'
import { useTask } from '../context/TaskProvider'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthProvider'
import { handleAddTask } from '../firebase/tasks-services/createTask'
import HeaderTask from '../elements/HeaderTask'
import Layout from '../components/Layout'
import ListTasks from '../components/ListTasks'

export default function Tasks() {
  const { taskName, handleChange, setTaskName } = useTask()
  const { user } = useAuth()

  // Obtener la categoria por la URL
  const { id: category } = useParams()

  // Enviar el formulario
  const handleSubmitTask = (e) => {
    e.preventDefault()
    if (taskName === '') {
      return toast.error('Titulo requerido')
    }
    setTaskName('')
    handleAddTask(category, taskName, user)
  }

  return (
    <Layout>
      <div className='w-full h-full flex flex-col gap-4 overflow-y-auto mb-20'>
        <HeaderTask />

        <ListTasks />
      </div>

      <form
        className='absolute bottom-0 left-0 right-0 p-4'
        onSubmit={handleSubmitTask}
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
    </Layout>
  )
}
