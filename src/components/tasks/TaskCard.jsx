import { Button, Card, CardBody, Checkbox } from '@nextui-org/react'
import { IconEdit } from '@tabler/icons-react'
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { useTask } from '../../context/TaskProvider'
import { useModal } from '../../context/ModalProvider'
import { priorityTask } from '../../utils/helpers/priorityColor'
import { db } from '../../firebase/firebaseConfig'
import { isTodayOrYesterday } from '../../utils/helpers/formattedDate'

export default function TaskCard({ item }) {
  const { handleEdit } = useTask()
  const { toggleModalTask } = useModal()

  // Mostrar la prioridad segun el color
  const priority = priorityTask(item.priority)

  // Opciones para formatear la fecha
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  const handleEditTask = (item) => {
    toggleModalTask()
    handleEdit(item)
  }

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
    <Card className='w-full relative p-2 col-span-4 group/task select-none rounded-none'>
      <CardBody>
        <div className='flex gap-5 items-center justify-between'>
          <article className='w-full flex items-center gap-2'>
            <div className='ml-1'>
              <Checkbox
                color='success'
                size='lg'
                radius='full'
                defaultSelected={item.completed}
                onValueChange={() => handleCheckTask(item)}
              />
            </div>
            <article>
              <h2 className='text-lg md:text-2xl font-bold line-clamp-1'>
                {item.title}
              </h2>
              <p className='font-bold mt-1.5'>
                Prorioridad:{' '}
                <span className={`${priority.text_color}`}>
                  {priority.name}
                </span>
              </p>
              <p className='text-xs md:text-sm mt-1.5 text-white/50'>
                {isTodayOrYesterday(item.date_created, options, {
                  time: 'hours'
                })}
              </p>
            </article>
          </article>
          <Button
            onPress={() => handleEditTask(item)}
            isIconOnly
            radius='full'
            color='success'
          >
            <IconEdit />
          </Button>
        </div>
      </CardBody>
      <div
        className={`${priority.chip_color} absolute left-0 top-0 bottom-0 w-2`}
      />
    </Card>
  )
}
