import { useTask } from '../context/TaskProvider'
import { motion } from 'framer-motion'
import TaskList from './TaskList'

export default function FinishedTasks() {
  const { tasks } = useTask()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5
      }
    }
  }

  const itemAnimate = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  // Obtener las tareas terminadas
  const TASK_FINISHED = tasks.filter((item) => item.done !== false)
  return (
    <div className='my-8'>
      <h2 className='mb-4'>Tareas terminadas</h2>
      <motion.ul
        variants={container}
        initial='hidden'
        animate='show'
        className='w-full grid grid-cols-2 gap-5'
      >
        {TASK_FINISHED.map((item) => {
          return (
            <motion.li variants={itemAnimate} key={item.id}>
              <TaskList item={item} key={item.id} />
            </motion.li>
          )
        })}
      </motion.ul>
    </div>
  )
}
