import TaskCard from '../elements/TaskCard'
import { useParams } from 'react-router-dom'
import { useTask } from '../context/TaskProvider'
import { Skeleton } from '@nextui-org/react'

export default function ListCardTasks() {
  const { tasks, status } = useTask()

  // Obtener la categoria por la URL
  const { id } = useParams()
  const category = id

  // Obtener las tareas por categoria
  const newTasks = tasks.filter((item) => item.categoryId === category)

  // const TEST = 'pending'
  if (status === 'pending' || status === 'idle') {
    return <Skeleton className='max-w-full h-16 mb-20 rounded-lg'/>
  }

  return (
    <ul className='relative grid gap-2'>
      {newTasks.length === 0 && (
        <article className='text-center mt-20 text-5xl text-white/50'>
          No hay tareas disponibles.
        </article>
      )}
      {newTasks.map((item) => (
        <li key={item.id}>
          <TaskCard item={item} />
        </li>
      ))}
    </ul>
  )
}
