import { Card, CardBody, Checkbox, Input } from '@nextui-org/react'
import { useTask } from '../context/TaskProvider'
import TaskButtons from './TaskButtons'
import TaskTitle from './TaskTitle'

export default function TaskCard({ item }) {
  const {
    editTask,
    newTaskName,
    handleChange,
    handleSaveTask,
    handleCheckTask,
    handleEdit
  } = useTask()

  // Editar el elemento segun el ID
  const EDIT_TASK_ID = editTask.id === item.id

  // Enviar form de editar
  const handleSubmitEdit = (e) => {
    e.preventDefault()
    handleSaveTask(item)
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
            {EDIT_TASK_ID ? (
              <form className='w-full my-0.5' onSubmit={handleSubmitEdit}>
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
              <TaskTitle item={item} />
            )}
          </article>
          <div
            className={`flex gap-2 ${
              EDIT_TASK_ID ? 'opacity-[1]' : 'opacity-0'
            } transition-all duration-250 ease-in-out group-hover/task:opacity-[1]`}
          >
            <TaskButtons item={item} />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
