import {
  Button,
  Card,
  CardFooter,
  Select,
  SelectItem,
  Tooltip
} from '@nextui-org/react'

import { prioritys } from '../mocks/proprotys'
import { useTask } from '../context/TaskProvider'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'

export default function HeaderHome() {
  const {
    completedTasks,
    toggleCompleted,
    handleSelectPriority,
    selectedPriority
  } = useTask()

  return (
    <Card className='justify-end min-h-48 p-2 shadow-none'>
      <CardFooter className='w-full flex justify-between items-end'>
        <article className='flex flex-col'>
          <h2 className='text-6xl capitalize font-light mb-2'>Tareas</h2>
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
