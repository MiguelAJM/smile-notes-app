import { Bars } from 'react-loader-spinner'
import { Button } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { useTask } from '../context/TaskProvider'
import { useModal } from '../context/ModalProvider'
import Layout from '../components/Layout'
import TasksStats from '../components/tasks/TaskStats'

export default function Home() {
  const { status } = useTask()
  const { toggleModalCategory } = useModal()

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
            Ha ocurrido un error inesperado, vuelve en otro momento.
          </h2>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='w-full h-full flex flex-col gap-2 text-center mt-20 lg:mt-5 p-4 overflow-hidden'>
        <article className='flex flex-col gap-4 my-4'>
          <h1 className='text-3xl md:text-7xl lg:mb-8 font-medium'>
            ¡Hola de nuevo!
          </h1>
        </article>
        <Button
          onPress={() => toggleModalCategory()}
          size='lg'
          startContent={<IconPlus />}
          className='bg-[#181818] mb-4 min-h-16 text-xl'
        >
          Crear categoria
        </Button>
        <TasksStats />
      </div>
    </Layout>
  )
}
