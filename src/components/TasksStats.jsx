import { Card } from '@nextui-org/react'
import { getTotalTasks } from '../helpers/getTotalTasks'
import { useTask } from '../context/TaskProvider'

export default function TasksStats() {
  const { tasks } = useTask()

  return (
    <div className='w-full flex flex-col gap-5 p-4'>
      <article className='flex flex-col gap-4 mb-3'>
        <h1 className='col-span-3 text-7xl font-medium'>Hola de nuevo</h1>
        <p className='text-2xl text-white/75'>Crea una categoria y empieza a listar</p>
      </article>
      <div className='w-full grid grid-cols-3 gap-4'>
        <Card className='aspect-square grid place-content-center'>
          <div>
            <h2 className='text-4xl font-bold'>Tareas</h2>
            <p className='text-8xl text-center text-yellow-500'>
              {getTotalTasks(tasks, { task: 'all' })}
            </p>
          </div>
        </Card>
        <Card className='aspect-square grid place-content-center'>
          <div>
            <h2 className='text-4xl font-bold'>Completadas</h2>
            <p className='text-8xl text-center text-lime-500'>
              {getTotalTasks(tasks, { task: 'completed' })}
            </p>
          </div>
        </Card>
        <Card className='aspect-square grid place-content-center'>
          <div>
            <h2 className='text-4xl font-bold'>Por completar</h2>
            <p className='text-8xl text-center text-red-500'>
              {getTotalTasks(tasks, { task: 'no-completed' })}
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
