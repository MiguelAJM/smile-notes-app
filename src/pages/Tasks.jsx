import { Button } from '@nextui-org/react'
import { Bars } from 'react-loader-spinner'
import { IconPlus } from '@tabler/icons-react'
import { useTask } from '../context/TaskProvider'
import { useModal } from '../context/ModalProvider'
import Layout from '../components/Layout'
import TaskOptions from '../components/tasks/TaskOptions'
import TaskList from '../components/tasks/TaskList'
import TaskModal from '../components/modal/TaskModal'

export default function Tasks() {
  const { status } = useTask()
  const { toggleModalTask } = useModal()

  if (status === 'pending' || status === 'idle') {
    return (
      <Layout>
        <div className='w-full h-full flex justify-center items-center'>
          <Bars
            height='275'
            width='275'
            color='#181818'
            ariaLabel='bars-loading'
            visible={true}
          />
        </div>
      </Layout>
    )
  }

  if (status === 'rejected') {
    return (
      <Layout>
        <div className='w-full flex flex-col items-start'>
          <h2 className='text-xl font-medium text-center'>
            No se ha podido obtener la categoria.
          </h2>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Layout>
        <div className='w-full flex flex-col gap-4 h-full overflow-y-auto mt-24 lg:mt-0 mb-20'>
          <TaskOptions />
          <TaskList />
        </div>

        <div className='absolute bottom-0 right-0 left-0 p-2 md:p-8 lg:px-16 lg:py-4'>
          <Button
            fullWidth
            onPress={() => toggleModalTask()}
            startContent={<IconPlus />}
            className='bg-[#181818]'
          >
            Nueva tarea
          </Button>
        </div>
      </Layout>
      <TaskModal />
    </>
  )
}
