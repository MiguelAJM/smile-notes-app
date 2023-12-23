import TaskCard from '../components/TaskCard'
import { useParams } from 'react-router-dom'
import { useTask } from '../context/TaskProvider'
import { Progress } from '@nextui-org/react'

export default function ListCard() {
  const { tasks, status } = useTask()

  // Obtener la categoria por la URL
  const { id } = useParams()
  const CATEGORY = id

  // Obtener las tareas por categoria
  const NEW_TASKS = tasks.filter((item) => item.categoryId === CATEGORY)

  // const status = 'pending'

  if (status === 'pending' || status === 'idle') {
    return (
      <Progress
        aria-label='Cargando...'
        value={100}
        classNames={{ base: 'max-w-full', indicator: 'bg-[#333333]' }}
      />
    )
  }

  return (
    <ul className='grid gap-2'>
      {NEW_TASKS.map((item) => (
        <li key={item.id}>
          <TaskCard item={item} />
        </li>
      ))}
    </ul>
  )
}
