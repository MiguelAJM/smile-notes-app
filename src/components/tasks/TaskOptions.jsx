import { Button, Select, SelectItem } from '@nextui-org/react'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import { useTask } from '../../context/TaskProvider'
import { priorities } from '../../utils/mocks/priorities'
import TaskHeader from './TaskHeader'

export default function TaskOptions() {
  const {
    completedTasks,
    selectedPriority,
    toggleCompleted,
    handleSelectPriority
  } = useTask()
  return (
    <div className='grid grid-cols-4 gap-4'>
      <TaskHeader />
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
        {priorities.map((items) => (
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
