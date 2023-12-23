import { Input } from '@nextui-org/react'
import { useParams } from 'react-router-dom'
import { useTask } from '../context/TaskProvider'
import Aside from '../components/Aside'
import HeaderTask from '../elements/HeaderTask'
import ListCard from '../elements/ListCard'

export default function Tasks() {
  const { taskName, handleChange, handleSubmitTask } = useTask()

  // Obtener la categoria por la URL
  const { id } = useParams()
  const CATEGORY = id

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSubmitTask(CATEGORY)
  }

  return (
    <section className='w-full h-screen p-6'>
      <div className=' w-full h-full flex justify-center items-center flex-col gap-8 mx-auto'>
        <div className='flex gap-8 w-full h-full'>
          <Aside />
          <div className='w-3/4 relative flex flex-col bg-gradient-to-br to-purple-800 from-purple-600 rounded-2xl gap-4 p-4 overflow-hidden'>
            <div className='w-full h-full flex flex-col gap-4 overflow-y-auto  mb-20'>
              <HeaderTask />

              <ListCard />
            </div>

            <form
              className='absolute bottom-0 left-0 right-0 p-4'
              onSubmit={handleSubmit}
            >
              <Input
                name='taskName'
                type='text'
                size='lg'
                autoFocus
                label='Nueva tarea...'
                value={taskName}
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
