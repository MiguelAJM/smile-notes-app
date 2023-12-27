import { Card } from '@nextui-org/react'
import React from 'react'
import { getTotalTasks } from '../helpers/getTotalTasks'
import { useTask } from '../context/TaskProvider'

export default function TasksStats() {
  const { tasks } = useTask()

  return (
    <div className='grid grid-cols-3 gap-4'>
      <Card className='aspect-video grid place-content-center'>
        <div>
          <h2 className='text-4xl font-bold'>Tareas</h2>
          <p className='text-8xl text-center text-yellow-500'>
            {getTotalTasks(tasks, { task: 'all' })}
          </p>
        </div>
      </Card>
      <Card className='aspect-video grid place-content-center'>
        <div>
          <h2 className='text-4xl font-bold'>Completadas</h2>
          <p className='text-8xl text-center text-lime-500'>
            {getTotalTasks(tasks, { task: 'completed' })}
          </p>
        </div>
      </Card>
      <Card className='aspect-video grid place-content-center'>
        <div>
          <h2 className='text-4xl font-bold'>Por completar</h2>
          <p className='text-8xl text-center text-red-500'>
            {getTotalTasks(tasks, { task: 'no-completed' })}
          </p>
        </div>
      </Card>
    </div>
  )
}
