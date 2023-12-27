import { useTask } from '../context/TaskProvider'
import { Bars } from 'react-loader-spinner'
import { Button } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { useModal } from '../context/ModalProvider'
import Layout from '../components/Layout'
import TasksStats from '../components/TasksStats'

export default function Home() {
  const { status } = useTask()
  const { toggleModal } = useModal()

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
    <Layout>
      <div className='w-full h-full flex flex-col justify-between'>
        <TasksStats />
        <Button
          onPress={() => toggleModal()}
          size='lg'
          startContent={<IconPlus />}
          className='bg-[#181818]'
        >
          Crear categoria
        </Button>
      </div>
    </Layout>
  )
}
