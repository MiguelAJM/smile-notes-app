import {
  Button,
  Input
} from '@nextui-org/react'
import { useTask } from '../context/TaskProvider'
import FinishedTasks from './FinishedTasks'
import TaskList from './TaskList'

export default function Tasks() {
  const {
    task,
    tasks,
    handleSubmit,
    handleChange
  } = useTask()

  // Obtener las tareas terminadas
  const TASKS = tasks.filter((item) => item.done !== false)
  const TASK_FINISHED = TASKS.length > 0

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-[350px]'>
        <Input
          name='title'
          label='Titulo'
          type='text'
          value={task.title}
          onChange={handleChange}
        />
        <Button type='submit' color='primary'>
          Crear
        </Button>
      </form>

      <div className='my-8'>
        <h2 className='mb-4'>Lista de tareas</h2>
        <ul className='w-full grid grid-cols-2 gap-5'>
          {tasks.map((item) => {
            return <TaskList item={item} key={item.id} />
          })}
        </ul>
      </div>

      {TASK_FINISHED && <FinishedTasks />}
    </div>
  )
}
