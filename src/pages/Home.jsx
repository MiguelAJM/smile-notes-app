import { Card } from '@nextui-org/react'
import Layout from '../components/Layout'
import { useTask } from '../context/TaskProvider'
import { getTotalTasks } from '../helpers/getTotalTasks'

export default function Home() {
  const { tasks } = useTask()

  return (
    <Layout>
      <div className='grid grid-cols-3 gap-4'>
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
    </Layout>
  )
}
