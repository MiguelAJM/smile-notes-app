import { Button, Card, CardBody, Checkbox, Input } from '@nextui-org/react'
import { formattedDate } from '../helpers/formattedDate'
import { useTask } from '../context/TaskProvider'

export default function TaskCard({ item }) {
  const {
    editTask,
    newTaskName,
    handleChange,
    handleEditTask,
    handleCheckTask,
    handleDeleteTask,
    handleEdit
  } = useTask()

  // Editar el elemento segun el ID
  const EDIT_TASK_ID = editTask.id === item.id

  // Enviar form de editar
  const handleSubmitEdit = (e) => {
    e.preventDefault()
    handleEditTask(item)
  }

  return (
    <Card className='p-2 col-span-4'>
      <CardBody>
        <div className='flex gap-5 items-center justify-between'>
          <article className='w-full flex items-center gap-2'>
            <div>
              <Checkbox
                color='secondary'
                size='lg'
                radius='full'
                defaultSelected={item.completed}
                onValueChange={() => handleCheckTask(item)}
              />
            </div>
            {EDIT_TASK_ID ? (
              <form className='w-full' onSubmit={handleSubmitEdit}>
                <Input
                  autoFocus
                  name='editTask'
                  placeholder={item.title}
                  value={newTaskName}
                  onChange={handleChange}
                  size='sm'
                />
              </form>
            ) : (
              <div>
                <h2 className='text-2xl font-bold'>{item.title}</h2>
                <p className='text-sm text-white/50 uppercase'>
                  {formattedDate(item.date_created)}
                </p>
              </div>
            )}
          </article>
          <div className='flex gap-2'>
            <Button
              radius='full'
              color='success'
              onPress={
                EDIT_TASK_ID
                  ? () => handleEditTask(item)
                  : () => handleEdit(item)
              }
            >
              {EDIT_TASK_ID ? 'Guardar' : 'Editar'}
            </Button>
            <Button
              onPress={() => handleDeleteTask(item)}
              radius='full'
              color='danger'
            >
              Eliminar
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
