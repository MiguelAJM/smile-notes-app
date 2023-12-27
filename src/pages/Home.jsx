import Layout from '../components/Layout'
import { useTask } from '../context/TaskProvider'
import TaskCard from '../elements/TaskCard'
import { isCompletedTasks } from '../helpers/isCompletedTasks'
import { Bars } from 'react-loader-spinner'
import HeaderHome from '../elements/HeaderHome'
import TasksStats from '../components/TasksStats'

export default function Home() {
  const { tasks, status, completedTasks, selectedPriority } = useTask()

  const completed = isCompletedTasks(tasks, completedTasks)

  // Filtramos las tareas completadas
  const filteredTasks = completed.filter(
    (item) => selectedPriority === 'all' || item.priority === selectedPriority
  )

  if (status === 'pending' || status === 'idle') {
    return (
      <Layout>
        <div className='w-full h-full flex justify-center items-center'>
          <Bars
            height='275'
            width='275'
            color='#181818'
            ariaLabel='bars-loading'
            visible={true}
          />
        </div>
      </Layout>
    )
  }

  if (status === 'rejected') {
    return (
      <Layout>
        <div className='w-full flex flex-col items-start'>
          <h2 className='text-xl font-medium text-center'>
            No se ha podido obtener la categoria.
          </h2>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <TasksStats />
      <div className='flex flex-col gap-4 h-full overflow-hidden'>
        <HeaderHome />
        <ul className='flex flex-col gap-4 h-full overflow-y-auto'>
          {filteredTasks.map((item) => (
            <li key={item.id}>
              <TaskCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
