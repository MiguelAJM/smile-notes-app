import { Card } from '@nextui-org/react'
import { getTotalTasks } from '../helpers/getTotalTasks'
import { useTask } from '../context/TaskProvider'

export default function TasksStats() {
  const { tasks } = useTask()

  return (
    <div className='w-full h-full flex flex-col gap-5 my-2 overflow-y-auto'>
      <div className='w-full grid grid-cols-3 gap-4'>
        <Card className='col-span-3 md:col-span-1 aspect-square grid place-content-center'>
          <div>
            <h2 className='text-3xl lg:text-lg xl:text-2xl font-bold'>Tareas</h2>
            <p className='text-6xl lg:text-8xl text-center text-yellow-500'>
              {getTotalTasks(tasks, { task: 'all' })}
            </p>
          </div>
        </Card>
        <Card className='col-span-3 md:col-span-1 aspect-square grid place-content-center'>
          <div>
            <h2 className='text-3xl lg:text-lg xl:text-2xl font-bold'>Completadas</h2>
            <p className='text-6xl lg:text-8xl text-center text-lime-500'>
              {getTotalTasks(tasks, { task: 'completed' })}
            </p>
          </div>
        </Card>
        <Card className='col-span-3 md:col-span-1 aspect-square grid place-content-center'>
          <div>
            <h2 className='text-3xl lg:text-lg xl:text-2xl font-bold'>Por completar</h2>
            <p className='text-6xl lg:text-8xl text-center text-red-500'>
              {getTotalTasks(tasks, { task: 'no-completed' })}
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
