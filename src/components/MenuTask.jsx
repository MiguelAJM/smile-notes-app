import { Button, Select, SelectItem } from '@nextui-org/react'
import { prioritys } from '../mocks/proprotys'
import { useTask } from '../context/TaskProvider'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import HeaderTask from './HeaderTask'

export default function MenuTask() {
  const {
    completedTasks,
    selectedPriority,
    toggleCompleted,
    handleSelectPriority
  } = useTask()
  return (
    <div className='grid grid-cols-4 gap-4'>
      <HeaderTask />
      <Button
        onPress={() => toggleCompleted()}
        radius='sm'
        size='lg'
        startContent={!completedTasks ? <IconEyeClosed /> : <IconEye />}
        className='col-span-2 bg-[#181818]'
      >
        {completedTasks ? 'Todas' : 'Completadas'}
      </Button>
      <Select
        aria-label='Priority Filter'
        label='Filtrar prioridad'
        defaultSelectedKeys={[selectedPriority]}
        onChange={handleSelectPriority}
        size='sm'
        classNames={{
          base: 'col-span-2 w-full',
          listbox: 'bg-[#181818]',
          trigger: 'bg-[#181818]'
        }}
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
  )
}
