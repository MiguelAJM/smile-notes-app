import { Card } from '@nextui-org/react'
import { useTask } from '../../context/TaskProvider'
import { getTotalTasks } from '../../utils/helpers/getTotalTasks'
import { useCategory } from '../../context/CategoryProvider'

export default function TasksStats() {
  const { tasks } = useTask()
  const { categories } = useCategory()

  return (
    <div className='w-full h-full flex flex-col gap-5 my-2 overflow-y-auto'>
      <div className='w-full grid grid-cols-4 gap-4'>
        <Card className='col-span-4 lg:col-span-2 p-4 flex flex-row items-center justify-between'>
          <h2 className='text-2xl font-bold'>Tareas</h2>
          <p className='text-2xl text-yellow-500'>
            {getTotalTasks(tasks, { task: 'all' })}
          </p>
        </Card>
        <Card className='col-span-4 lg:col-span-2 p-4 flex flex-row items-center justify-between'>
          <h2 className='text-2xl font-bold'>Completadas</h2>
          <p className='text-2xl text-lime-500'>
            {getTotalTasks(tasks, { task: 'completed' })}
          </p>
        </Card>
        <Card className='col-span-4 lg:col-span-2 p-4 flex flex-row items-center justify-between'>
          <h2 className='text-2xl font-bold'>Por completar</h2>
          <p className='text-2xl text-red-500'>
            {getTotalTasks(tasks, { task: 'no-completed' })}
          </p>
        </Card>
        <Card className='col-span-4 lg:col-span-2 p-4 flex flex-row items-center justify-between'>
          <h2 className='text-2xl font-bold'>Categorias</h2>
          <p className='text-2xl text-pink-500'>{categories.length}</p>
        </Card>
      </div>
    </div>
  )
}
