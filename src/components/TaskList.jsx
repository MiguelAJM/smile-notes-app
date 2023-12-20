import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider
} from '@nextui-org/react'
import { useTask } from '../context/TaskProvider'
import { Input } from 'postcss'
import { formattedDate } from '../helpers/formattedDate'

export default function TaskList({ item }) {
  const {
    updateTask,
    editTask,
    handleUpdateNote,
    handleCheckTask,
    handleDeleteNote,
    handleChangeTask,
    handleEditTask
  } = useTask()

  return (
    <Card className='col-span-1'>
      <CardHeader>
        <div>
          {editTask.id === item.id ? (
            <Input
              name='title'
              label='Titulo'
              type='text'
              value={updateTask.title}
              onChange={handleChangeTask}
            />
          ) : (
            <p>{item.title}</p>
          )}
          <p className='capitalize'>{formattedDate(item.date_created)}</p>
          <Checkbox
            size='large'
            color='success'
            radius='full'
            isSelected={item.done}
            onValueChange={() => handleCheckTask(item)}
          >
            Terminada
          </Checkbox>
        </div>
      </CardHeader>
      <Divider />
      <CardFooter className='grid grid-cols-2 gap-5'>
        <Button color='danger' onPress={() => handleDeleteNote(item.id)}>
          Eliminar
        </Button>
        <Button
          color='success'
          onPress={
            editTask.id === item.id
              ? () => handleUpdateNote()
              : () => handleEditTask(item)
          }
        >
          {editTask.id === item.id ? 'Guardar' : 'Editar'}
        </Button>
      </CardFooter>
    </Card>
  )
}
