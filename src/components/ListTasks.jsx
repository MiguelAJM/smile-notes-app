import TaskCard from '../elements/TaskCard'
import { useParams } from 'react-router-dom'
import { useTask } from '../context/TaskProvider'
import { isCompletedTasks } from '../helpers/isCompletedTasks'

export default function ListCardTasks() {
  const { tasks, completedTasks, selectedPriority } = useTask()

  // Obtener la categoria por la URL
  const { id } = useParams()
  const category = id

  // Obtener las tareas por categoria
  const tasksByCategory = tasks.filter((item) => item.categoryId === category)

  // Obtenemos las tareas completadas
  const completed = isCompletedTasks(tasksByCategory, completedTasks)

  // Filtramos las tareas completadas
  const filteredTasks = completed.filter(
    (item) => selectedPriority === 'all' || item.priority === selectedPriority
  )

  return (
    <ul className='relative grid gap-2'>
      {filteredTasks.length === 0 && (
        <article className='text-center mt-20 text-5xl text-white/50'>
          No hay tareas disponibles.
        </article>
      )}
      {filteredTasks.map((item) => (
        <li key={item.id}>
          <TaskCard item={item} />
        </li>
      ))}
    </ul>
  )
}
