import { Card, CardBody, Checkbox } from '@nextui-org/react'
import { useTask } from '../context/TaskProvider'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { toast } from 'sonner'
import TaskButtons from './TaskButtons'
import EditTaskInput from './EditTaskInput'

export default function TaskCard({ item }) {
  const { editTask, handleEdit } = useTask()

  // Editar el elemento segun el ID
  const editingTask = editTask.id === item.id

  // Establecer tarea completada
  async function handleCheckTask(item) {
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
    <Card
      onDoubleClick={() => handleEdit(item)}
      className='p-2 col-span-4 group/task'
    >
      <CardBody>
        <div className='flex gap-5 items-center justify-between'>
          <article className='w-full flex items-center gap-2'>
            <div>
              <Checkbox
                color='success'
                size='lg'
                radius='full'
                defaultSelected={item.completed}
                onValueChange={() => handleCheckTask(item)}
              />
            </div>
            <EditTaskInput item={item} />
          </article>
          <div
            className={`${
              editingTask ? 'opacity-[1]' : 'opacity-0'
            } flex gap-2 transition-all duration-250 ease-in-out group-hover/task:opacity-[1]`}
          >
            <TaskButtons item={item} />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
