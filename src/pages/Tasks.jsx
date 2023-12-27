import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useParams } from 'react-router-dom'
import { useTask } from '../context/TaskProvider'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthProvider'
import { handleAddTask } from '../firebase/tasks-services/createTask'
import HeaderTask from '../elements/HeaderTask'
import Layout from '../components/Layout'
import ListTasks from '../components/ListTasks'
import { prioritys } from '../mocks/proprotys'

export default function Tasks() {
  const { taskName, handleChange, priorityName, handleClear } = useTask()
  const { user } = useAuth()

  // Obtener la categoria por la URL
  const { id: category } = useParams()

  // Enviar el formulario
  const handleSubmitTask = (e) => {
    e.preventDefault()
    if (taskName === '') {
      return toast.error('Titulo requerido')
    }

    if (priorityName === '') {
      return toast.error('Prioridad requerida')
    }

    handleClear()
    handleAddTask(category, taskName, user, priorityName)
  }

  return (
    <Layout>

        <div className='w-full flex flex-col gap-4 h-full overflow-y-auto mb-20'>
          <HeaderTask />

          <ListTasks />
        </div>

      <form
        className='absolute bottom-0 left-0 right-0 py-4 px-32 flex items-center gap-4'
        onSubmit={handleSubmitTask}
      >
        <Input
          name='taskName'
          type='text'
          size='sm'
          autoFocus
          label='Nueva tarea...'
          value={taskName}
          onChange={handleChange}
        />
        <Select
          className='w-1/4'
          size='sm'
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
        <Button type='submit' color='default' size='lg'>
          Crear
        </Button>
      </form>
    </Layout>
  )
}
