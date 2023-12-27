import {
  Button,
  Card,
  CardFooter,
  Select,
  SelectItem,
  Skeleton,
  Tooltip
} from '@nextui-org/react'
import { useCategory } from '../context/CategoryProvider'
import { useParams } from 'react-router-dom'
import { useTask } from '../context/TaskProvider'
import { IconEyeClosed, IconEye } from '@tabler/icons-react'
import { prioritys } from '../mocks/proprotys'
import { formattedDate } from '../helpers/formattedDate'

export default function HeaderTask() {
  const { id } = useParams()
  const category = id

  const { categories, status } = useCategory()
  const {
    completedTasks,
    selectedPriority,
    toggleCompleted,
    handleSelectPriority
  } = useTask()

  // Opciones para formatear la fecha
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour12: true
  }

  if (status === 'pending' || status === 'idle') {
    return (
      <Card className='justify-end h-48 p-2'>
        <CardFooter className='w-full flex flex-col items-start'>
          <Skeleton className='w-[155px] h-[60px] mb-2 rounded-lg' />
          <Skeleton className='w-64 h-8 rounded-lg' />
        </CardFooter>
      </Card>
    )
  }

  if (status === 'rejected') {
    return (
      <Card className='justify-end h-48 p-2'>
        <CardFooter className='w-full flex flex-col items-start'>
          <h2 className='text-xl font-medium text-center'>
            No se ha podido obtener la categoria.
          </h2>
        </CardFooter>
      </Card>
    )
  }

  // Obtener la categoria actual
  const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/g
  const categoryName = category.replace(regex, ' ')

  // Obtener la fecha de ceracion de la categoria
  const categoryCreated = categories.find((item) => item.date_created)
  const dateCreated = categoryCreated.date_created

  return (
    <Card className='justify-end min-h-48 p-2 shadow-none'>
      <CardFooter className='w-full flex justify-between items-end'>
        <article className='flex flex-col'>
          <h2 className='text-6xl capitalize font-light mb-2'>
            {categoryName}
          </h2>
          <h3 className='text-2xl font-light capitalize'>
            {formattedDate(dateCreated, options, { time: 'full-date' })}
          </h3>
        </article>
        <div className='flex w-1/2 items-center gap-4'>
          <Tooltip
            showArrow
            content={completedTasks ? 'Mostrar todo' : 'Tareas completadas'}
          >
            <Button
              onPress={() => toggleCompleted()}
              radius='sm'
              size='lg'
              fullWidth
              startContent={completedTasks ? <IconEyeClosed /> : <IconEye />}
            >
              {completedTasks ? 'No completadas' : 'Completadas'}{' '}
            </Button>
          </Tooltip>
          <Select
            aria-label='Priority Filter'
            label='Filtrar prioridad'
            defaultSelectedKeys={[selectedPriority]}
            onChange={handleSelectPriority}
            size='sm'
          >
            {prioritys.map((items) => (
              <SelectItem
                textValue={items.label}
                key={items.value}
                value={items.value}
              >
                {items.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </CardFooter>
    </Card>
  )
}
