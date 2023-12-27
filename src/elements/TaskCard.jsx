import { Card, CardBody, Checkbox } from '@nextui-org/react'
import { useTask } from '../context/TaskProvider'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { toast } from 'sonner'
import { priorityTask } from '../helpers/priorityColor'
import TaskButtons from './TaskButtons'
import TaskTitle from './TaskTitle'

export default function TaskCard({ item }) {
  const { editTask } = useTask()

  // Editar el elemento segun el ID
  const editingTask = editTask.id === item.id

  // Mostrar la prioridad segun el color
  const priorityColor = priorityTask(item.priority)

  // Establecer tarea completada
  const handleCheckTask = async (item) => {
    try {
      const q = doc(db, 'tasks', item.id)
      await updateDoc(q, {
        completed: !item.completed
      })
    } catch (error) {
      toast.error('Ha ocurrido un error')
    }
  }

  return (
    <Card className='relative p-2 col-span-4 group/task select-none'>
      <CardBody>
        <div className='flex gap-5 items-center justify-between'>
          <article className='w-full flex items-center gap-2'>
            <div className='ml-3'>
              <Checkbox
                color='success'
                size='lg'
                radius='full'
                defaultSelected={item.completed}
                onValueChange={() => handleCheckTask(item)}
              />
            </div>
            <TaskTitle item={item} />
          </article>
          <div
            className={`${
              editingTask ? 'opacity-[1]' : 'opacity-0'
            } flex items-center gap-2 transition-all duration-250 ease-in-out group-hover/task:opacity-[1]`}
          >
            <TaskButtons item={item} />
          </div>
        </div>
      </CardBody>
      <div className={`${priorityColor} absolute left-0 top-0 bottom-0 w-4`} />
    </Card>
  )
}
