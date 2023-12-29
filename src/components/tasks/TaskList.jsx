import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { useParams } from 'react-router-dom'
import { IconTrash } from '@tabler/icons-react'
import { useTask } from '../../context/TaskProvider'
import { isCompletedTasks } from '../../utils/helpers/isCompletedTasks'
import { handleDeleteTask } from '../../firebase/services/tasks/deleteTask'
import TaskCard from './TaskCard'

export default function TaskList() {
  const EMPTY_TASKS = 0
  const { tasks, completedTasks, selectedPriority, handleClear } = useTask()

  // Obtener la categoria por la URL
  const { id: category } = useParams()

  // Obtener las tareas por categoria
  const tasksByCategory = tasks.filter((item) => item.categoryId === category)
  // Obtenemos las tareas completadas
  const completed = isCompletedTasks(tasksByCategory, completedTasks)
  // Filtramos las tareas completadas
  const filteredTasks = completed.filter(
    (item) => selectedPriority === 'all' || item.priority === selectedPriority
  )

  const trailingActions = (item) => (
    <TrailingActions className='grid place-content-center'>
      <SwipeAction
        className='bg-red-500 h-full p-8 text-black'
        destructive={true}
        onClick={() => handleDeleteTask(item, handleClear)}
      >
        <IconTrash size={64} />
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <>
      <SwipeableList>
        {filteredTasks.map((item) => (
          <SwipeableListItem
            className='mb-2'
            trailingActions={trailingActions(item)}
            key={item.id}
          >
            <TaskCard item={item} />
          </SwipeableListItem>
        ))}
      </SwipeableList>
      {filteredTasks.length === EMPTY_TASKS && (
        <article className='w-full text-center mt-8 text-3xl text-white/50'>
          <h2>No hay tareas.</h2>
        </article>
      )}
    </>
  )
}
